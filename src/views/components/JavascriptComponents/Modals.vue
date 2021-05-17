<template>
    <!-- Modals -->
    <div class="row">
        <div class="col-md-12">
            <base-button block type="default" class=" mb-3" @click="modals.modal3 = true">
                Generar Codigo
            </base-button>

            <modal :show.sync="modals.modal3" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm">
                <card type="secondary" shadow
                      header-classes="bg-white pb-5"
                      body-classes="px-lg-5 py-lg-5"
                      class="border-0">
                    <template>
                        <div class="text-muted text-center mb-3">
                            <small>Codigo de Verificacion</small>
                        </div>
                    </template>
                    <template>
                        <div class="text-center text-muted mb-4">
                            <small>Anexe codigo que le ha llegado a su correo</small>
                        </div>
                        <div class="alert alert-success" role="alert" v-if="send === true">
                                {{messagesTrue}} <i class='bx bxs-wink-smile'></i>.
                            </div>
                            <div class="alert alert-danger" role="alert" v-if="Notsend === true">
                                {{messagesFalse}} 
                                <i class='bx bxs-wink-smile'></i>.
                            </div>
                        <form role="form"  @submit.prevent="Confirm" >
                            <base-input alternative class="mb-3" placeholder="Código" addon-left-icon="ni ni-email-83" v-model="codigo" required></base-input>
                            
                            <button class="btn btn-primary btn-lg btn-block btnG">Continuar</button>
                        </form>
                    </template>
                </card>
            </modal>
        </div>
    </div>
</template>
<script>
    import Modal from "@/components/Modal.vue";
    import UserService from "../../../services/UserService";
    import PagosServices from "../../../services/PagosServices";
    import TokenService from "../../../services/tokenService";
    import ConfigService from "../../../services/configService";
    import CuentaService from "../../../services/cuentaService";

    const userService = new UserService();
    const pagosServices = new PagosServices();
    const tokenService = new TokenService();
    const configService = new ConfigService();
    const cuentaService = new CuentaService();
    
    export default {
        components: {
            Modal
        },
        data() {
            return {
            modals: {
                modal3: false,    
            },
                UserLog:"",
                messagesTrue:"",
                messagesFalse:"",
                send:false,
                Notsend:false,
                TokenUnico:"",

                codigo:"",
                id: "",
                montoConf:"",

                CodigoEmail:"",
                tokenConf:"",
            };
        },
        created(){   
            this.get_Users();               
        },
        methods:{
            get_Users(){
                this.UserLog= userService.getToken();              
            },
            //traemos y verificamos tokens de usuario con usuario activo
            getUsuarios(){ 
                const getUser = userService.getUsers(this.UserLog)
                .then(data=>{
                    if(data.token === this.UserLog){
                        this.TokenUnico=data.token;     //traigo token unico                       
                    }
                })
            },
            //verificamos que los codigos sean iguales y coincidan
            Confirm(){
                this.getUsuarios()               
                const getConfirs= configService.getConfig();

                getConfirs.then(data=>{
                    for(let i=0; i<=data.length; i++){
                        
                        //recorremos toda la tabla y almacenamos los datos que deseamos 
                        this.CodigoEmail = data[i].codigoEnviado_email;
                        this.tokenConf = data[i].token_user;
                        this.montoConf = data[i].monto;
                        this.id=data[i].id;
                        
                        //verificamso si codigoemail y codigorecibido son iguales
                        if(this.codigo !== this.CodigoEmail && this.tokenConf !== this.TokenUnico ){
                            this.Notsend = true,
                            this.messagesFalse = "El codigo que usted ha ingresado no es correcto "
                        }
                        else {      
                            this.cuenta();
                        }                                         
                    }                    
                })                
            },

            //verificamos que en la tabla cuenta el token sea igual
            cuenta(){
               const cuentaADebitar = cuentaService.getCuentas();

               cuentaADebitar.then(data=>{
                   console.log(data,"desde cuenta")
                   for(let i=0; i<= data.length; i++){
                        //recorremos la tabla para verificar los token y obtener id del cual se esta manejando
                        if(data[i].token_user === this.UserLog){
                            const total= data[i].total;
                            const id_cuenta = data[i].id;
                            //confirmamos que el monto este a corde a la cantidad que tenemos
                            if(total <= this.montoConf || total == 0){
                                    this.Notsend = true,
                                    this.messagesFalse = "Usted no dispone de saldo suficiente para realizar esta transaccion";
                                    setTimeout(function(){ window.location.href='/#/inicio'}, 200);
                            }
                            if(total > this.montoConf){
                                    this.postConfir(this.id);
                                    const totalMonto= (total- this.montoConf);
                                    //enviamos el monto restando lo que tenemos
                                    this.PUTCuenta(id_cuenta, totalMonto);                        
                            }                            
                        }else{
                            console.log("Ha ocurrido un error con la cuenta")
                        }
                   }
               })
            },

            //almacenamos codigo comparado para confirmar que ambos codigos son iguales
            postConfir(id_cuenta){
                var dat=JSON.stringify({
                    "codigoRecibido_email":this.codigo
                })

                const postConf= configService.putConfig(id_cuenta , dat);

                postConf.then(data=>{
                    console.log(data, "desde editConf")
                    if(data.error){
                        this.Notsend = true,
                        this.messagesFalse = data.error                        
                    }else{
                        this.Notsend = false,
                        this.send = true,
                        this.messagesTrue = data.message + "Todo Ok"  
                        setTimeout(function(){ window.location.href='/#/inicio'}, 200); 
                    }
                })
            },
            //actualizamos tabla cuenta con el nuevo monto
            PUTCuenta(id_cuenta, totalMonto){                
                var dat=JSON.stringify({
                    "total":totalMonto,
                })

                const PutCuenta= cuentaService.putCuenta(id_cuenta, dat);

                PutCuenta.then(data=>{
                    console.log(data, "desdePUTTTTT");
                })
            }
        }
    };
</script>
