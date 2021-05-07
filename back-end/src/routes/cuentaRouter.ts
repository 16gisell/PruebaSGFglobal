import {Router} from 'express'; //definir un enrutador
import CuentaController from '../controller/cuentaController';

class CuentaRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', CuentaController.ListCuentas);
        this.router.get('/:id',CuentaController.ListCuentaId); 
        this.router.post('/',CuentaController.nuevaCuenta);
        this.router.put('/:id',CuentaController.actualizarCuenta); 
    }

}
const cuentaRouter = new CuentaRouter();
export default cuentaRouter.router;