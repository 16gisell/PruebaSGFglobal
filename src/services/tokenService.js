class TokenService{

    generarToken(){
        const rand=()=>Math.random().toString(36).substr(2);
        let token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);
        return token(6)
    }
}

export default TokenService