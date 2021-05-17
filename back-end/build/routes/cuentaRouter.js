"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //definir un enrutador
const cuentaController_1 = __importDefault(require("../controller/cuentaController"));
class CuentaRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', cuentaController_1.default.ListCuentas);
        this.router.get('/:token', cuentaController_1.default.ListCuentaId);
        this.router.post('/', cuentaController_1.default.nuevaCuenta);
        this.router.put('/:id', cuentaController_1.default.actualizarCuenta);
    }
}
const cuentaRouter = new CuentaRouter();
exports.default = cuentaRouter.router;
