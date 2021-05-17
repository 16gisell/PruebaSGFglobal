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
                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <h4 class="mb-1">Iniciemos Sesión!!</h4>
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
                                <small>Inicia sesion con nosotros!!</small>
                            </div>
                            <form @submit.prevent="LoginUser">
                                <base-input alternative class="mb-3" placeholder="Correo" addon-left-icon="ni ni-email-83" required v-model="correo"></base-input>
                                <base-input alternative type="password" placeholder="Contraseña" addon-left-icon="ni ni-lock-circle-open" required v-model="password"></base-input>
                                 <button class="btn btn-primary btn-lg btn-block btnG">Guardar</button>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#/" class="text-light">
                                <small>Registrar?</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import UserService from "../services/UserService";
    import TokenService from "../services/tokenService";

    const userService = new UserService();
    const tokenService = new TokenService();

    export default {
        components: {  },
        data() {
            return { 
                messagesTrue:"",
                messagesFalse:"",
                send:false,
                Notsend:false,
                dataUser:"",

                correo:"",
                password: "",
            };
        },
        created(){   

        },
        methods:{
            LoginUser(){
                var datos=JSON.stringify({
                    "correo":this.correo,
                    "password": this.password,
                })
                const userPost = userService.postUserLogin(datos);

                userPost.then(data=>{
                    if(data.error){
                        this.Notsend = true,
                        this.messagesFalse = data.error
                    } else{  
                        this.dataUser= data[0]
                        const sert=userService.setUser(this.dataUser)
                        const settoken= userService.setToken(this.dataUser.token)            
                        setTimeout(function(){  window.location.href='/#/inicio'}, 200); 
                    }
                    
                })
                userPost.catch((err)=>
                    console.log(err) 
                )
            },
            
        }
    };
</script>
// 