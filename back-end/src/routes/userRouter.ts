import {Router} from 'express'; //definir un enrutador
import userController from '../controller/userController';

class UserRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', userController.listUser);
        this.router.get('/:id',userController.usuario); 
        this.router.post('/',userController.crearUser);
        this.router.post('/login',userController.LoginUser);
        this.router.put('/:id',userController.actualizarUser) 
        this.router.delete('/:id',userController.eliminarUser); 

        //this.router.post('/login/:id',userController.logiar);
    }

}
const userRouter = new UserRouter();
export default userRouter.router;