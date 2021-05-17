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
                                <h4 class="mb-1">Recarguemos!!</h4>
                                <p class="mt-0">Un poco de recarga Para seguir con cuestras compras</p>
                            </div>
                            <div class="alert alert-success" role="alert" v-if="send === true">
                                {{messagesTrue}} <i class='bx bxs-wink-smile'></i>.
                            </div>
                            <div class="alert alert-danger" role="alert" v-if="Notsend === true">
                                {{messagesFalse}} <i class='bx bxs-wink-smile'></i>.
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Disfruta de los servicios de nuestra billetera</small>
                            </div>
                            <form @submit.prevent="Recargar">                                                              
                                <base-input alternative class="mb-3" type="text" placeholder="Monto *" addon-left-icon="ni ni-hat-3" v-model="monto" required> </base-input>
                                <base-input class="mb-4">
                                    <textarea class="form-control form-control-alternative" name="name" rows="4" cols="80" placeholder="Descripcion" v-model="descripcion"> </textarea>
                                </base-input>
                                <button class="btn btn-primary btn-lg btn-block btnG">Guardar</button>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import UserService from "../services/UserService";
    import RecargaService from "../services/RecargaService";
    import CuentaService from "../services/cuentaService";

    const userService = new UserService();
    const recargaService = new RecargaService();
    const cuentaService = new CuentaService();

    export default {
        components: {  },
        data() {
            return { 
                UserLog:"",
                messagesTrue:"",
                messagesFalse:"",
                send:false,
                Notsend:false,

                descripcion:"",
                monto:"",
            };
        },
        created(){   
            this.get_Users(); 
                   
        },
        methods:{
            get_Users(){
                this.UserLog= userService.getToken();
            },      
            //accion recarga saldo en billetera      
            Recargar(){ 
                    var datos=JSON.stringify({
                        "token_user": this.UserLog,
                        "monto": this.monto,
                        "tipo":"Recarga",
                        "descripcion": this.descripcion,
                    })

                    const recargar = recargaService.postRecarga(datos);
                    
                    recargar.then(data=>{
                        if(data.error){
                            this.Notsend = true,
                            this.messagesFalse = data.error
                        }else{
                            this.Notsend = false,
                            this.cuenta();
                            this.send = true,
                            this.messagesTrue = data.message                  
                            setTimeout(function(){  window.location.href='/#/inicio'}, 200);     
                        }
                    })
            },
            //verificamos que el token de usuario sea compatible con el usuario activo si no posee cuenta se crea una nueva
            cuenta(){
               const cuentaADebitar = cuentaService.getCuentas();

               cuentaADebitar.then(data=>{
                   for(let i=0; i<= data.length; i++){
                       //verificamos que el token sea correcto
                        if(data[i].token_user === this.UserLog){
                            const total= parseInt(data[i].total);
                            const CambioMonto=parseInt(this.monto)
                            const id_cuenta = data[i].id;                        
                            const totalMonto= total+CambioMonto;

                            this.PUTCuenta(id_cuenta, totalMonto);
                        }else{
                            console.log("Error")
                        }   
                   }
                   
               })
            },
            //actualizamos tablacuenta
            PUTCuenta(id_cuenta, totalMonto){                
                var dat=JSON.stringify({
                    "total":totalMonto,
                })
                const PutCuenta= cuentaService.putCuenta(id_cuenta, dat);
                PutCuenta.then(data=>{
                })
            }
        }
    };
</script>
