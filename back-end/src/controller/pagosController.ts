import {Request, Response} from 'express';
import pool from '../database';

class PagosController{

    public async listPagos(req: Request, res: Response){//para listar todos
       const list = await pool.query('SELECT * FROM pagos')
       res.json(list)
    }

    public async listPagosID(req:Request, res:Response): Promise<any>{//para listar por uno
        const{token} = req.params;
        const listRecarga = await pool.query('SELECT * FROM pagos WHERE token_user = ?', [token]);
        if(listRecarga.length>0){
            return res.json(listRecarga[0]);
        }
        res.status(404).json({message:"no existe"});
    }

    public async CargarPago(req:Request, res:Response): Promise<void>{//para crear
        
        if(req.body.monto =="" && req.body.correo =="" && req.body.codigoTienda =="" && req.body.descripcion ==""){
            res.status(401).send({error: "todos los campos deben de ser completados"})
        }
        else if(req.body.monto == ""){
            res.status(401).send({error: "El campo monto debe ser completado"})
        }
        else if(req.body.correo == ""){
            res.status(401).send({error: "El campo correo"})
        }
        else if(req.body.codigoTienda == ""){
            res.status(401).send({error: "El campo codigo de tienda debe ser completado"})
        }
        else if(req.body.descripcion == ""){
            res.status(401).send({error: "El campo descripcion debe ser completado"})
        }
        else{
            await pool.query('INSERT INTO pagos set ?', [req.body]);
            res.json({message:'Codigo Enviado'});
            res.status(200);
        }
    }
}

const pagosController = new PagosController();
export default pagosController;