<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="#/inicio">
                Billetera
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    Billetera
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <a slot="title" href="#/inicio" class="nav-link" data-toggle="dropdown" role="button">
                    <i class="ni ni-ui-04 d-lg-none"></i>
                    <span class="nav-link-inner--text">Inicio</span>
                </a>
                <a slot="title" href="#/recargar" class="nav-link" data-toggle="dropdown" role="button">
                    <i class="ni ni-collection d-lg-none"></i>
                    <span class="nav-link-inner--text">Recargar</span>
                </a>
                <a slot="title" href="#/pagar" class="nav-link" data-toggle="dropdown" role="button">
                    <i class="ni ni-collection d-lg-none"></i>
                    <span class="nav-link-inner--text">Pagar</span>
                </a>
                <a slot="title" href="#/consultar" class="nav-link" data-toggle="dropdown" role="button">
                    <i class="ni ni-collection d-lg-none"></i>
                    <span class="nav-link-inner--text">Consultar</span>
                </a>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" @click="Salir" rel="noopener"
                       data-toggle="tooltip" title="Like us on Facebook">
                        <span class="nav-link-inner--text">Salir</span>
                    </a>
                </li>
            </ul>
        </base-nav>
    </header>
</template>
<script>
    import BaseNav from "@/components/BaseNav";
    import BaseDropdown from "@/components/BaseDropdown";
    import CloseButton from "@/components/CloseButton";
    import UserService from "../services/UserService";
    const userService = new UserService();

    export default {
        components: {
            BaseNav,
            CloseButton,
            BaseDropdown
          },
        data() {
            return { 
                
            };
        },
        created(){       
        },
        methods:{
            Salir(){
                const UserLog= userService.Salir();
                                
            }
        }
    };
</script>
