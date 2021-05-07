class RecargaService{
    constructor(){
        this.URI = "http://localhost:3000/api/recarga";
    }

    async getRecargas(){
        const respuesta= await fetch(this.URI);
        console.log(respuesta)
        const recargas =respuesta.json();
        return recargas;
    }

    async getRecargasId(id){
        const respuesta= await fetch(`${this.URI}/${id}`);
        const recargas =respuesta.json();
        return recargas;
    }

    async postRecarga(datos){ 
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

export default RecargaService