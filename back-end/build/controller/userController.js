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
class UserController {
    //listar una consulta de la base de datos
    listUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listUser = yield database_1.default.query('SELECT * FROM usuarios');
            res.json(listUser);
        });
    }
    //listar por individual utilizaremos el token para esto
    usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const user = yield database_1.default.query('SELECT * FROM usuarios WHERE token = ?', [token]);
            if (user.length > 0) {
                return res.json(user[0]);
            }
            res.status(404).send({ error: "El usuario no existe" });
        });
    }
    //inserta en la base de datos.
    crearUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);// para ejecutarlo desde el posman 
            const correo = req.body.correo;
            const documento = req.body.documento;
            const token = req.body.token;
            const verificarCorreo = yield database_1.default.query('SELECT * FROM usuarios WHERE correo= ?', [correo]);
            const verificarDocumento = yield database_1.default.query('SELECT * FROM usuarios WHERE documento= ?', [documento]);
            const verificartoken = yield database_1.default.query('SELECT * FROM usuarios WHERE token= ?', [token]);
            console.log(verificarCorreo, "desde verificar correo");
            if (req.body.nombreUsuario == "" && req.body.correo == "" && req.body.documento == "" && req.body.telefono == "" && req.body.password == "") {
                res.status(400).send({ error: "Todos loscampos deben de ser completado" });
            }
            //verificar campo correo
            else if (req.body.correo == "") {
                res.status(401).send({ error: "El campo correo debe ser completado" });
            }
            else if (verificarCorreo != false) {
                res.status(401).send({ error: "El correo ya ha sido registrado" });
            }
            //verificamos campo documento
            else if (req.body.documento == "") {
                res.status(402).send({ error: "El campo documento esta vacio" });
            }
            else if (verificarDocumento != false) {
                res.status(401).send({ error: "Eeste documento ya ha sido registrado" });
            }
            //verificamos capo telefono
            else if (req.body.telefono == "") {
                res.status(403).send({ error: "El campo telefono debe ser completado" });
            }
            //verificamos campo nombre
            else if (req.body.nombreUsuario == "") {
                res.status(404).send({ error: "El campo nombre debe ser completado" });
            }
            //verificamos campo contraseña
            else if (req.body.password == "") {
                res.status(405).send({ error: "El campo contraseña debe de ser completado" });
            }
            //verificamos que no haya repeticion de token
            else if (verificartoken != false) {
                res.status(401).send({ error: "Error de verificacion de token" });
            }
            // si todo esta ok creamos registramos al usuario
            else {
                yield database_1.default.query('INSERT INTO usuarios set ?', [req.body]); //esto es el inserto y consulta con la base de datos
                res.json({ message: 'El usuario se ha registrado de forma correcta' });
                res.status(200);
            }
        });
    }
    LoginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);// para ejecutarlo desde el posman 
            const correo = req.body.correo;
            const password = req.body.password;
            const verificarCorreo = yield database_1.default.query('SELECT * FROM usuarios WHERE correo= ?', [correo]);
            const verificarPassword = yield database_1.default.query('SELECT * FROM usuarios WHERE password= ?', [password]);
            console.log(verificarCorreo, verificarPassword);
            if (verificarPassword == false) {
                res.status(404).send({ error: "Contraseña incorrecta" });
            }
            if (verificarCorreo == false) {
                res.status(404).send({ error: "Correo incorrecto" });
            }
            else {
                res.json(verificarCorreo);
                //esto es el inserto y consulta con la base de datos
                res.json({ message: 'Bienvenido' });
                res.status(200);
            }
        });
    }
    //actualizamos el jueg
    actualizarUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const id_user = req.body.token;
            const verificar = yield database_1.default.query('SELECT * FROM usuarios WHERE token= ?', [id_user]);
            yield database_1.default.query('UPDATE usuarios set ? WHERE token = ?', [req.body, token]);
            res.json(verificar);
            res.json({ text: 'actualizando usuario' });
        });
    }
    //eliminamos elementos o datos de la base de datos    
    eliminarUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            yield database_1.default.query('DELETE FROM usuarios WHERE id = ?', [token]);
            res.json({ text: 'eliminando el usuario' });
        });
    }
    //logiare usuario
    logiar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email, password } = req.params;
            const user = yield database_1.default.query('SELECT * FROM usuarios WHERE id = ?, emil = ?, password = ? ', { id, email, password });
            if (user.length > 0) {
                return res.json(user[0]);
            }
            res.status(404).json({ text: "no existe" });
        });
    }
}
const userController = new UserController();
exports.default = userController;
