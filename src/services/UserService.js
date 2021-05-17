import util from "util";
class UserService{
    constructor(){
        this.URI = "http://localhost:3000/api/user";
        const dataUser={
            nombreUsuario:"",
            documento:"",
            password:"",
            correo:"",
            telefono:"",
            token:""
        }
        // this.URI = "/api/gastos";
    }

    async getUsers(){
        const respuesta= await fetch(this.URI);
        console.log(respuesta)
        const usuarios =respuesta.json();
        return usuarios;
    }

    async getUserId(token){
        const respuesta= await fetch(`${this.URI}/${token}`);
        const usuario =respuesta.json();
        return usuario;
    }

    //creando el usuario
    async postUser(user){ 
        const res = await fetch(this.URI, {
            method:'POST',
            body:user,
            headers:{
                'content-type': 'application/json'
            }
        });
       const data = await res.json();
        return data
    }
    async postUserLogin(user){ 
        const res = await fetch(this.URI+"/login", {
            method:'POST',
            body:user,
            headers:{
                'content-type': 'application/json'
            }
        });
       const data = await res.json();
        return data
    }

    async editUser(id, user){
        const dele = await fetch(this.URI+'/'+id,{
            method:'PUT',
            body:user,
            headers:{
                'content-type': 'application/json'
            }            
        })
        const data = await dele.json();
        return data;
    }


    //seteamos usuario
    setUser(user){ //guarda el usuario
        console.log(user, "desde setUser")
        let user_string =JSON.stringify(user);
        localStorage.setItem('currenUser', user_string);
    }

    setToken(token){ //una vez que elusuario este logiado guarda el token 
        localStorage.setItem('accessToken', token);
    }
    
    getToken(){
        return localStorage.getItem('accessToken');
    }

    getCurrenUser(){//saber el usuario que este logado en ese momento 
        let user_string =localStorage.getItem('currenUser');
        if(!util.isNullOrUndefined(user_string)){
            let user =JSON.parse(user_string);
            return user;
        }else{
            return null;
        }
    }

    Salir(){
        let accessToken = localStorage.getItem('accessToken')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('currenUser')
        setTimeout(function(){  window.location.href='/#/login'}, 100);     
    }
    
}

export default UserService