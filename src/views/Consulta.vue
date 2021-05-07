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
        <h1 class="display-3  text-white">Monto Disponible: $ {{totalDiponible}} USD</h1>
        <div class="container pt-lg-md">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="row row-grid">
                            <div class="col-lg-4" v-for="option in pago" v-bind:key="option.value">
                                <card class="border-0" hover shadow body-classes="py-5">
                                    <icon name="ni ni-check-bold" type="primary" rounded class="mb-4">
                                    </icon>
                                    <h6 class="text-primary text-uppercase">Fecha Transaccion: {{option.fecha}}</h6>
                                    <h6 class="text-primary text-uppercase">Tipo Transaccion: {{option.tipo}}</h6>
                                    <h6 class="text-primary text-uppercase" style="color: red !important;">Monto: {{option.monto}}</h6>
                                    <h6 class="text-primary text-uppercase">Descripcion:</h6> <p class="description mt-3">{{option.description}}</p>
                                </card>
                            </div>
                            <div class="col-lg-4" v-for="option in rec" v-bind:key="option.value">
                                <card class="border-0" hover shadow body-classes="py-5">
                                    <icon name="ni ni-check-bold" type="primary" rounded class="mb-4">
                                    </icon>
                                    <h6 class="text-primary text-uppercase">Fecha Transaccion: {{option.fecha}}</h6>
                                    <h6 class="text-primary text-uppercase">Tipo Transaccion: {{option.tipo}}</h6>
                                    <h6 class="text-primary text-uppercase" style="color: #00a92c !important;">Monto: {{option.monto}}</h6>
                                    <h6 class="text-primary text-uppercase">Descripcion:</h6> <p class="description mt-3">{{option.descripcion}}</p>
                                </card>
                            </div>
                           
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
    import RecargaService from "../services/RecargaService";
    import PagosServices from "../services/PagosServices";
    import CuentaService from "../services/cuentaService";


    const userService = new UserService();
    const tokenService = new TokenService();
    const recargaService = new RecargaService();
    const pagosServices = new PagosServices();
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
                rec:"",
                pago:"",
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

                const recarga = recargaService.getRecargas();
                recarga.then(data=>{
                    this.rec=data
                })

                const pagos = pagosServices.getPagos();
                pagos.then(data =>{
                    this.pago= data;
                })
            },
            get_cuentas(){
                const cuenta = cuentaService.getCuentas();
                cuenta.then(data=>{
                    console.log(data)
                    for(let i=0; i<= data.length; i++){
                        console.log(this.UserLogtoken)
                        if(data[i].token_user ===  this.UserLogtoken){
                            this.totalDiponible=data[i].total
                            console.log(data[i], "sisiis token")
                        }
                    }
                    console.log(data, "datata")
                })
            }
            
        }
    };
</script>
<style>
</style>