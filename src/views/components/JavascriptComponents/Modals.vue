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
                modal1: false,
                modal2: false,
                modal3: false,    
            },
                UserLog:"",
                messagesTrue:"",
                messagesFalse:"",
                send:false,
                Notsend:false,
                activ:false,
                TokenUnico:"",

                codigo:"",
                id: "",
                montoConf:"",
            };
        },
        created(){   
            this.get_Users();                 
        },
        methods:{
            get_Users(){
                this.UserLog= userService.getToken();
                console.log(this.UserLog, "del get");                
            },
            getUsuarios(){
                const getUser= userService.getUsers(); //traemos u verificamos tokens de usuario con usuario activo
                getUser.then(data=>{
                    console.log(data,"desde Confirm")
                    for(let i=0; i<= data.length; i++){
                        const tokenUsers= data[i].token;
                        if(tokenUsers === this.UserLog){
                            this.TokenUnico=tokenUsers;     //traigo token unico                       
                        }
                    }
                })
            },
            Confirm(){
                this.getUsuarios()     //verificamos que los codigos sean iguales y coincidan           
                const getConfirs= configService.getConfig();
                getConfirs.then(data=>{
                    for(let i=0; i<=data.length; i++){
                        const CodigoEmail = data[i].codigoEnviado_email;
                        const tokenConf = data[i].token_user;
                        this.montoConf = data[i].monto;
                       
                        if(CodigoEmail === this.codigo &&  tokenConf === this.TokenUnico ){  //verificamso si codigoemail y codigorecibido son iguales    
                            this.id=data[i].id;
                            this.cuenta();
                        }else if(!this.codigo === CodigoEmail){
                            this.Notsend = true,
                            this.messagesFalse = "El codigo que usted ha ingresado no es correcto "
                        }else if(!this.TokenUnico === tokenConf){
                            this.Notsend = true,
                            this.messagesFalse = "Su usuario no coincide con el codigo "
                        }                      
                    }
                })                
            },
            cuenta(){
               const cuentaADebitar = cuentaService.getCuentas();
               cuentaADebitar.then(data=>{
                   for(let i=0; i<= data.length; i++){
                       if(data[i].token_user === this.UserLog){
                                const total= data[i].total;
                                const id_cuenta = data[i].id;

                            if(total > this.montoConf){
                                    this.postConfir(this.id);
                                    const totalMonto= (total- this.montoConf);
                                    //enviamos el monto restando lo que tenemos
                                    this.PUTCuenta(id_cuenta, totalMonto);                        
                            }
                            if(total < this.montoConf){
                                    this.Notsend = true,
                                    this.messagesFalse = "Usted no dispone de saldo suficiente para realizar esta transaccion";
                                    setTimeout(function(){ window.location.href='/#/'}, 3000);
                            }
                       }else{
                           console.log("error")
                       }
                   }
               })
            },
            postConfir(id){
                var dat=JSON.stringify({
                    "codigoRecibido_email":this.codigo
                })
                const postConf= configService.putConfig(id, dat);
                postConf.then(data=>{
                    console.log(data, "desde editConf")
                    if(data.error){
                        this.Notsend = true,
                        this.messagesFalse = data.error
                        
                    }else{
                        this.send = true,
                        this.messagesTrue = data.message + "Todo Ok"                 
                        this.activ = true;
                        setTimeout(function(){ window.location.href='/#/inicio'}, 3000); 
                    }
                })
            },
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
<style>
</style>
