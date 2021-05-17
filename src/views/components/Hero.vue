<template>
    <section class="section-hero section-shaped my-0">
        <div class="shape shape-style-1 shape-primary">
            <span class="span-150"></span>
            <span class="span-50"></span>
            <span class="span-50"></span>
            <span class="span-75"></span>
            <span class="span-100"></span>
            <span class="span-75"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
        </div>
        <div class="container shape-container d-flex align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-7 text-center pt-lg">
                        <img src="img/brand/imagesfue.png" style="width: 200px;" class="img-fluid">
                        <p class="lead text-white mt-4 mb-5">Bienvenido Usuario</p>
                        <h3>Total disponible en la cuenta</h3>
                        <h2>$ {{totalDiponible}} USD</h2>
                       
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import UserService from "../../services/UserService";
    import CuentaService from "../../services/cuentaService";

    const userService = new UserService();
    const cuentaService = new CuentaService();

    export default {
        components: {  },
        data() {
            return { 
                UserLogtoken:"",
                totalDiponible:"",
            };
        },
        created(){   
            this.get_Users();     
            this.get_cuentas(); 
        },
        methods:{
            get_Users(){
                this.UserLogtoken = userService.getToken();
            },
            get_cuentas(){
                const cuenta = cuentaService.getCuentas();
                cuenta.then(data=>{
                    for(let i=0; i<= data.length; i++){
                        if(data[i].token_user ===  this.UserLogtoken){
                            this.totalDiponible=data[i].total
                        }
                    }
                })
            },
        }
    };
</script>
