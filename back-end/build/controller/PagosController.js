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
            const { id } = req.params;
            const listRecarga = yield database_1.default.query('SELECT * FROM pagos WHERE id = ?', [id]);
            if (listRecarga.length > 0) {
                return res.json(listRecarga[0]);
            }
            res.status(404).json({ message: "no existe" });
        });
    }
    CargarPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO pagos set ?', [req.body]);
            res.json({ message: 'recarga realizada' });
            res.status(200);
        });
    }
}
const pagosController = new PagosController();
exports.default = pagosController;
