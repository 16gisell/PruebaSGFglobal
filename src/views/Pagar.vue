<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <h4 class="mb-1">Paguemos Todo!!</h4>
                                <p class="mt-0">Pagar ahora es mas facil solo necesitas el codigo de pago de la tienda</p>
                            </div>
                            <div class="alert alert-success" role="alert" v-if="send === true">
                                {{messagesTrue}} <i class='bx bxs-wink-smile'></i>.
                            </div>
                            <div class="alert alert-danger" role="alert" v-if="Notsend === true">
                                {{messagesFalse}} 
                                <i class='bx bxs-wink-smile'></i>.
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Disfruta de los servicios de nuestra billetera</small>
                            </div>
                            <form @submit.prevent="Pagar" v-if="activ == false">
                                <base-input alternative class="mb-3" type="text" placeholder="Codigo de la tienda" addon-left-icon="ni ni-hat-3" v-model="codigoTienda" required> </base-input>                                
                                <base-input alternative class="mb-3" type="text" placeholder="Monto" addon-left-icon="ni ni-hat-3" v-model="monto" required> </base-input>
                                <base-input alternative class="mb-3" type="email" placeholder="Correo" addon-left-icon="ni ni-email-83" required v-model="correo" ></base-input>
                                <base-input class="mb-4">
                                    <textarea class="form-control form-control-alternative" name="name" rows="4" cols="80" placeholder="Descripcion" v-model="descripcion"> </textarea>
                                </base-input>                                
                                <button class="btn btn-primary btn-lg btn-block btnG" >Continuar</button>                                
                            </form>
                            <modals v-if="activ == true"></modals>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import UserService from "../services/UserService";
    import PagosServices from "../services/PagosServices";
    import Modals from "./components/JavascriptComponents/Modals";
    import TokenService from "../services/tokenService";
    import ConfigService from "../services/configService";
    import CuentaService from '../services/cuentaService';

    const userService = new UserService();
    const pagosServices = new PagosServices();
    const tokenService = new TokenService();
    const configService = new ConfigService();
    const cuentaService = new CuentaService();

    export default {
        components: {  
            Modals,
        },
        data() {
            return { 
                user:"",
                UserLog:"",
                messagesTrue:"",
                messagesFalse:"",
                send:false,
                Notsend:false,
                activ:false,

                descripcion:"",
                codigoTienda:"",
                monto:"",
                correo:"",
            };
        },
        created(){   
            this.get_Users(); 
                   
        },
        methods:{
            get_Users(){
                this.UserLog= userService.getToken();
            },
            get_monto(){
                
            },
            Pagar(){
                const getMonto = cuentaService.getCuentaId(this.UserLog);
                const monto = parseInt(this.monto)
                getMonto.then(data=>{
                    if(this.correo == "" || this.monto == "" || this.codigoTienda == "" || this.descripcion == ""){
                        this.Notsend = true,
                        this.messagesFalse = "Por favor complete todos los campos"
                    }
                    else if(monto > data.total){
                        this.Notsend = true,
                        this.messagesFalse = "El monto ingresado es mayor al monto total de la cuenta" 
                    }
                    else{                        
                        var datos=JSON.stringify({
                            "token_user": this.UserLog,
                            "correo":this.correo,
                            "codigoTienda": this.codigoTienda,
                            "monto": this.monto,
                            "tipo":"Pago",
                            "descripcion": this.descripcion,
                        })
                        this.codigo();
                        const pagar = pagosServices.postPagos(datos);
                        pagar.then(data=>{
                            if(data.error){
                                this.Notsend = true,
                                this.messagesFalse = data.error
                            }else{
                                this.Notsend = false,
                                this.send = true,
                                this.messagesTrue = data.message + "Por favor verifica tu correo para obtener el codigo"                 
                                this.activ = true;
                            }
                        })
                    }
                })                
            },
            codigo(){
                const token= tokenService.generarToken();
                var dat=JSON.stringify({
                    "token_user": this.UserLog,
                    "codigoEnviado_email":token,
                    "monto": this.monto,
                    "enviado_de":"Pago",
                    "correo": this.correo,
                })
                const generarCodigo = configService.postConfig(dat);
                generarCodigo.then(data=>{
                })
            }
        }
    };
</script>