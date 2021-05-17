import {Router} from 'express'; //definir un enrutador
import userController from '../controller/userController';

class UserRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', userController.listUser);
        this.router.get('/:token',userController.usuario); 
        this.router.post('/',userController.crearUser);
        this.router.post('/login',userController.LoginUser);
        this.router.put('/:token',userController.actualizarUser) 
        this.router.delete('/:token',userController.eliminarUser); 
    }

}
const userRouter = new UserRouter();
export default userRouter.router;