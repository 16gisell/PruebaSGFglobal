import {Request, Response} from 'express';
import pool from '../database';
import Email from '../template/correo';

class ConfirController{

    public async ListPagoConf(req: Request, res: Response){//para listar todos
       const listUser = await pool.query('SELECT * FROM confirpago')
       res.json(listUser)
    }

    public async ListPagoConfID(req:Request, res:Response): Promise<any>{//para listar por uno
        const{token} = req.params;
        const user = await pool.query('SELECT * FROM confirpago WHERE token_user = ?', [token]);
        if(user.length>0){
            return res.json(user[0]);
        }
        res.status(404).json({error:"no existe"});
    }

    public async crearPagoConf(req:Request, res:Response): Promise<void>{//para crear
            await pool.query('INSERT INTO confirpago set ?', [req.body]); //esto es el inserto y consulta con la base de datos
            const envio= Email.correo(req.body)
            res.json({message: 'Configuracion Realizada'});
            res.status(200)        
    }

    public async actualizarpagoConf(req:Request, res:Response): Promise<void> {//para actualizar
        const {id}= req.params;
        await pool.query('UPDATE confirpago set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'Pago Verificado'});
        res.status(404).send({error:"El codigo no es el correcto"})
    }
}

const confirController = new ConfirController();
export default confirController;