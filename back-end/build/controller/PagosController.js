"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PagosController {
    listPagos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield database_1.default.query('SELECT * FROM pagos');
            res.json(list);
        });
    }
    listPagosID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const listRecarga = yield database_1.default.query('SELECT * FROM pagos WHERE token_user = ?', [token]);
            if (listRecarga.length > 0) {
                return res.json(listRecarga[0]);
            }
            res.status(404).json({ message: "no existe" });
        });
    }
    CargarPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.monto == "" && req.body.correo == "" && req.body.codigoTienda == "" && req.body.descripcion == "") {
                res.status(401).send({ error: "todos los campos deben de ser completados" });
            }
            else if (req.body.monto == "") {
                res.status(401).send({ error: "El campo monto debe ser completado" });
            }
            else if (req.body.correo == "") {
                res.status(401).send({ error: "El campo correo" });
            }
            else if (req.body.codigoTienda == "") {
                res.status(401).send({ error: "El campo codigo de tienda debe ser completado" });
            }
            else if (req.body.descripcion == "") {
                res.status(401).send({ error: "El campo descripcion debe ser completado" });
            }
            else {
                yield database_1.default.query('INSERT INTO pagos set ?', [req.body]);
                res.json({ message: 'Codigo Enviado' });
                res.status(200);
            }
        });
    }
}
const pagosController = new PagosController();
exports.default = pagosController;
