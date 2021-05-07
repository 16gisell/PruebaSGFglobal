import {Request, Response} from 'express';
import pool from '../database';

class PagosController{

    public async listPagos(req: Request, res: Response){//para listar todos
       const list = await pool.query('SELECT * FROM pagos')
       res.json(list)
    }

    public async listPagosID(req:Request, res:Response): Promise<any>{//para listar por uno
        const{id} = req.params;
        const listRecarga = await pool.query('SELECT * FROM pagos WHERE id = ?', [id]);
        if(listRecarga.length>0){
            return res.json(listRecarga[0]);
        }
        res.status(404).json({message:"no existe"});
    }

    public async CargarPago(req:Request, res:Response): Promise<void>{//para crear
        await pool.query('INSERT INTO pagos set ?', [req.body]);
        res.json({message:'recarga realizada'});
        res.status(200);
        
    }
}

const pagosController = new PagosController();
export default pagosController;