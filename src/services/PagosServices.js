class PagosService{
    constructor(){
        this.URI = "http://localhost:3000/api/pagos";
    }

    async getPagos(){
        const respuesta= await fetch(this.URI);
        console.log(respuesta)
        const recargas =respuesta.json();
        return recargas;
    }

    async getPagosId(token){
        const respuesta= await fetch(`${this.URI}/${token}`);
        const recargas =respuesta.json();
        return recargas;
    }

    async postPagos(datos){ 
        
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
}

export default PagosService
