class ConfigService{
    constructor(){
        this.URI = "http://localhost:3000/api/config";
    }

    async getConfig(){
        const respuesta= await fetch(this.URI);
        console.log(respuesta)
        const recargas =respuesta.json();
        return recargas;
    }

    async getConfigId(id){
        const respuesta= await fetch(`${this.URI}/${id}`);
        const recargas =respuesta.json();
        return recargas;
    }

    async postConfig(datos){ 
        
        const res = await fetch(this.URI, {
            method:'POST',
            body:datos,
            headers:{
                'content-type': 'application/json'
            }
        });
       const data = await res.json();
        return data
    }

    async putConfig(id, datos){
        const dele = await fetch(this.URI+'/'+id,{
            method:'PUT',
            body:datos,
            headers:{
                'content-type': 'application/json'
            }            
        })
        const data = await dele.json();
        return data;
    }
}

export default ConfigService
