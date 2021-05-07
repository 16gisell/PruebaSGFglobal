class CuentaService{
    constructor(){
        this.URI = "http://localhost:3000/api/cuenta";
    }

    async getCuentas(){
        const respuesta= await fetch(this.URI);
        console.log(respuesta)
        const recargas =respuesta.json();
        return recargas;
    }

    async getCuentaId(id){
        const respuesta= await fetch(`${this.URI}/${id}`);
        const recargas =respuesta.json();
        return recargas;
    }

    async postCuenta(datos){ 
        
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

    async putCuenta(id, datos){
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

export default CuentaService
