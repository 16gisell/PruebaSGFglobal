"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //definir un enrutador
const confirController_1 = __importDefault(require("../controller/confirController"));
class ConfirRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', confirController_1.default.ListPagoConf);
        this.router.get('/:token', confirController_1.default.ListPagoConfID);
        this.router.post('/', confirController_1.default.crearPagoConf);
        this.router.put('/:id', confirController_1.default.actualizarpagoConf);
    }
}
const confirRouter = new ConfirRouter();
exports.default = confirRouter.router;
