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
class CuentaController {
    ListCuentas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listUser = yield database_1.default.query('SELECT * FROM cuentas');
            res.json(listUser);
        });
    }
    ListCuentaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield database_1.default.query('SELECT * FROM cuentas WHERE id = ?', [id]);
            if (user.length > 0) {
                return res.json(user[0]);
            }
            res.status(404).json({ message: "no existe" });
        });
    }
    nuevaCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO cuentas set ?', [req.body]); //esto es el inserto y consulta con la base de datos
            res.json({ message: 'guardado el usuario' });
            res.status(200);
        });
    }
    actualizarCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE cuentas set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'cuenta Verificado' });
            res.status(404).send({ error: "El codigo no es el correcto" });
        });
    }
}
const cuentaController = new CuentaController();
exports.default = cuentaController;
