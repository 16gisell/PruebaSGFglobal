import {Request, Response} from 'express';
import pool from '../database';

class UserController{

//listar una consulta de la base de datos
    public async listUser(req: Request, res: Response){//para listar todos
       const listUser = await pool.query('SELECT * FROM usuarios')
       res.json(listUser)
    }
//listar por individual utilizaremos el token para esto
    public async usuario(req:Request, res:Response): Promise<any>{//para listar por uno
        const{token} = req.params;
        const user = await pool.query('SELECT * FROM usuarios WHERE token = ?', [token]);
        if(user.length>0){
            return res.json(user[0]);
        }
        res.status(404).send({error:"El usuario no existe"});
    }

//inserta en la base de datos.
    public async crearUser(req:Request, res:Response): Promise<void>{//para crear
        //console.log(req.body);// para ejecutarlo desde el posman 
        const correo=req.body.correo;
        const documento= req.body.documento;
        const token = req.body.token;
        
        const verificarCorreo= await pool.query('SELECT * FROM usuarios WHERE correo= ?', [correo]);
        const verificarDocumento= await pool.query('SELECT * FROM usuarios WHERE documento= ?', [documento]);
        const verificartoken= await pool.query('SELECT * FROM usuarios WHERE token= ?', [token]);
        console.log( verificarCorreo, "desde verificar correo")

        if(req.body.nombreUsuario == "" && req.body.correo == "" && req.body.documento == "" && req.body.telefono == "" && req.body.password =="" ){
            res.status(400).send({error:"Todos loscampos deben de ser completado"})
        }

        //verificar campo correo
        else if(req.body.correo == ""){
            res.status(401).send({error:"El campo correo debe ser completado"})
        }
        else if(verificarCorreo != false){
            res.status(401).send({error:"El correo ya ha sido registrado"})
        }        

        //verificamos campo documento
        else if(req.body.documento == ""){
            res.status(402).send({error:"El campo documento esta vacio"})
        }  
        else if (verificarDocumento != false){
            res.status(401).send({error:"Eeste documento ya ha sido registrado"})
        } 

        //verificamos capo telefono
        else if(req.body.telefono == ""){
            res.status(403).send({error:"El campo telefono debe ser completado"})
        }

        //verificamos campo nombre
        else if(req.body.nombreUsuario == ""){
            res.status(404).send({error:"El campo nombre debe ser completado"})
        }

        //verificamos campo contraseña
        else if(req.body.password == ""){
            res.status(405).send({error:"El campo contraseña debe de ser completado"})
        }

        //verificamos que no haya repeticion de token
        else if(verificartoken != false){
            res.status(401).send({error:"Error de verificacion de token"})
        }
        // si todo esta ok creamos registramos al usuario
        else{               
            await pool.query('INSERT INTO usuarios set ?', [req.body]); //esto es el inserto y consulta con la base de datos
            res.json({message: 'El usuario se ha registrado de forma correcta'});
            res.status(200)
        }        
    }

    public async LoginUser(req:Request, res:Response): Promise<void>{//para crear
        //console.log(req.body);// para ejecutarlo desde el posman 
        const correo=req.body.correo;
        const password=req.body.password;
        
        const verificarCorreo= await pool.query('SELECT * FROM usuarios WHERE correo= ?', [correo]);
        const verificarPassword= await pool.query('SELECT * FROM usuarios WHERE password= ?', [password]);
        console.log(verificarCorreo, verificarPassword)
        if(verificarPassword == false ){
            res.status(404).send({error:"Contraseña incorrecta"})            
        }if(verificarCorreo == false){
            res.status(404).send({error:"Correo incorrecto"})  
        }
        else{
            res.json(verificarCorreo)
            //esto es el inserto y consulta con la base de datos
            res.json({message: 'Bienvenido'});
            res.status(200)
           
        }
        
    }

//actualizamos el jueg
    public async actualizarUser(req:Request, res:Response): Promise<void> {//para actualizar
        const {token}= req.params;
        const id_user=req.body.token
        const verificar= await pool.query('SELECT * FROM usuarios WHERE token= ?', [id_user]);
        await pool.query('UPDATE usuarios set ? WHERE token = ?', [req.body, token]);
        res.json(verificar)
        res.json({text: 'actualizando usuario'});

    }

//eliminamos elementos o datos de la base de datos    
    public async eliminarUser(req:Request, res:Response): Promise<void>{//para eliminar
        const {token}= req.params;
       await pool.query('DELETE FROM usuarios WHERE id = ?', [token]);
        res.json({text: 'eliminando el usuario'})
    }

//logiare usuario

    public async logiar(req:Request, res:Response){
        const {id, email, password} = req.params;
        const user = await pool.query('SELECT * FROM usuarios WHERE id = ?, emil = ?, password = ? ', {id, email, password})
        if(user.length>0){
            return res.json(user[0]);
        }
        res.status(404).json({text:"no existe"});
    }
}

const userController = new UserController();
export default userController;