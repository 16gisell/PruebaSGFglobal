"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //definir un enrutador
const recargarController_1 = __importDefault(require("../controller//recargarController"));
class RecargaRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', recargarController_1.default.listRecargas);
        this.router.get('/:id', recargarController_1.default.listRecargaID);
        this.router.post('/', recargarController_1.default.CrearRecarga);
        //this.router.post('/login/:id',userController.logiar);
    }
}
const recargaRouter = new RecargaRouter();
exports.default = recargaRouter.router;
