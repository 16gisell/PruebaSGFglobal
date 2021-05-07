import {Router} from 'express'; //definir un enrutador
import recargaController from '../controller//recargarController';

class RecargaRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', recargaController.listRecargas);
        this.router.get('/:id',recargaController.listRecargaID); 
        this.router.post('/',recargaController.CrearRecarga);

        //this.router.post('/login/:id',userController.logiar);
    }

}
const recargaRouter = new RecargaRouter();
export default recargaRouter.router;