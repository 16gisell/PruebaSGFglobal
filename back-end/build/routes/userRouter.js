"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //definir un enrutador
const userController_1 = __importDefault(require("../controller/userController"));
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', userController_1.default.listUser);
        this.router.get('/:id', userController_1.default.usuario);
        this.router.post('/', userController_1.default.crearUser);
        this.router.post('/login', userController_1.default.LoginUser);
        this.router.put('/:id', userController_1.default.actualizarUser);
        this.router.delete('/:id', userController_1.default.eliminarUser);
        //this.router.post('/login/:id',userController.logiar);
    }
}
const userRouter = new UserRouter();
exports.default = userRouter.router;
