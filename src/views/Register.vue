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
                                <h4 class="mb-1">Registrate Aqui!!</h4>
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
                            <form @submit.prevent="CrearUser">
                                <base-input alternative class="mb-3" type="text" placeholder="Nombre" addon-left-icon="ni ni-hat-3" v-model="nombreUsuario" required> </base-input>                                
                                <base-input alternative class="mb-3" type="text" placeholder="Telefono" addon-left-icon="ni ni-hat-3" v-model="telefono" required> </base-input>
                                <base-input alternative class="mb-3" type="text" placeholder="Documento de identidad" addon-left-icon="ni ni-hat-3" v-model="documento" required> </base-input>
                                <base-input alternative class="mb-3" type="email" placeholder="Correo" addon-left-icon="ni ni-email-83" required v-model="correo" ></base-input>
                                <base-input alternative type="password" placeholder="Password" addon-left-icon="ni ni-lock-circle-open" v-model="password" required></base-input>
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
    import TokenService from "../services/tokenService";
    import CuentaService from "../services/cuentaService";

    const userService = new UserService();
    const tokenService = new TokenService();
    const cuentaService = new CuentaService();

    export default {
        components: {  },
        data() {
            return { 
                user:"",
                messagesTrue:"",
                messagesFalse:"",
                send:false,
                Notsend:false,

                nombreUsuario:"",
                documento:"",
                correo:"",
                telefono:"",
                password: "",
                tokenUnico: "",
            };
        },
        created(){   },
        methods:{
            CrearUser(){
                const token= tokenService.generarToken();
                this.tokenUnico=token;
                var datos=JSON.stringify({
                    "nombreUsuario": this.nombreUsuario,
                    "documento":this.documento,
                    "correo":this.correo,
                    "telefono":this.telefono,
                    "password": this.password,
                    "token":this.tokenUnico,
                })
                console.log(datos)
                const userPost = userService.postUser(datos);
                userPost.then(data=>{
                                       
                    if(data.message){
                        const sert=userService.setUser(datos)
                        const settoken= userService.setToken(this.tokenUnico) 
                        this.NuevaCuenta()
                        this.send = true,
                        this.messagesTrue = data.message   
                        setTimeout(function(){  window.location.href='/#/inicio'}, 3000);               
                       
                        console.log(data)
                    }
                    else{
                        this.Notsend = true,
                        this.messagesFalse = data.error
                    }
                    console.log(data.error)
                    
                })
                userPost.catch((err)=>
                    console.log(err) 
                )
            },
            NuevaCuenta(){
                var datos=JSON.stringify({
                    "total": 0,
                    "token_user":this.tokenUnico,
                })
                const nueva= cuentaService.postCuenta(datos);
                nueva.then(data=>{
                    console.log(data)
                })
            }
        }
    };
</script>
