import {Request, Response} from 'express';
import pool from '../database';

class RecargaController{

    public async listRecargas(req: Request, res: Response){//para listar todos
       const list = await pool.query('SELECT * FROM recargas')
       res.json(list)
    }

    public async listRecargaID(req:Request, res:Response): Promise<any>{//para listar por uno
        const{id} = req.params;
        const listRecarga = await pool.query('SELECT * FROM recargas WHERE id = ?', [id]);
        if(listRecarga.length>0){
            return res.json(listRecarga[0]);
        }
        res.status(404).json({message:"no existe"});
    }

    public async CrearRecarga(req:Request, res:Response): Promise<void>{//para crear
        //console.log(req.body);// para ejecutarlo desde el posman 
        await pool.query('INSERT INTO recargas set ?', [req.body]);
        res.json({message:'recarga realizada'});
        res.status(200);
        
    }
}

const recargaController = new RecargaController();
export default recargaController;