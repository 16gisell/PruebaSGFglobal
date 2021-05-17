import {Request, Response} from 'express';
import pool from '../database';

class CuentaController{


    public async ListCuentas(req: Request, res: Response){//para listar todos
       const listUser = await pool.query('SELECT * FROM cuentas')
       res.json(listUser)
    }

    public async ListCuentaId(req:Request, res:Response): Promise<any>{//para listar por uno
        const{token} = req.params;
        const user = await pool.query('SELECT * FROM cuentas WHERE token_user = ?', [token]);
        if(user.length>0){
            return res.json(user[0]);
        }
        res.status(404).json({message:"no existe"});
    }

    public async nuevaCuenta(req:Request, res:Response): Promise<void>{//para crear
            await pool.query('INSERT INTO cuentas set ?', [req.body]); //esto es el inserto y consulta con la base de datos
            res.json({message: 'Nueva cuenta creada'});
            res.status(200)        
    }

    public async actualizarCuenta(req:Request, res:Response): Promise<void> {//para actualizar
        const {id}= req.params;
        await pool.query('UPDATE cuentas set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'cuenta Verificado'});
        res.status(404).send({error:"El codigo no es el correcto"})
    }
}

const cuentaController = new CuentaController();
export default cuentaController;