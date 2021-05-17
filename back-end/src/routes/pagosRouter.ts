import {Router} from 'express'; //definir un enrutador
import pagosController from '../controller/pagosController';

class PagosRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', pagosController.listPagos);
        this.router.get('/:token',pagosController.listPagosID); 
        this.router.post('',pagosController.CargarPago);
    }

}
const pagosRouter = new PagosRouter();
export default pagosRouter.router;