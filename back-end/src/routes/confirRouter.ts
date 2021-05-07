import {Router} from 'express'; //definir un enrutador
import ConfirController from '../controller/confirController';

class ConfirRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', ConfirController.ListPagoConf);
        this.router.get('/:id',ConfirController.ListPagoConfID); 
        this.router.post('/',ConfirController.crearPagoConf);
        this.router.put('/:id',ConfirController.actualizarpagoConf); 
    }

}
const confirRouter = new ConfirRouter();
export default confirRouter.router;