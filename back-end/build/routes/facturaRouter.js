"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //para definir un enrutador
const facturaController_1 = __importDefault(require("../controller/facturaController"));
class FacturaRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', facturaController_1.default.factura);
        this.router.get('/:idPizza', facturaController_1.default.listFactura);
        this.router.post('/', facturaController_1.default.create);
    }
}
const facturaRouter = new FacturaRouter();
exports.default = facturaRouter.router;
