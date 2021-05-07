"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//archivos de rutas
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const recargaRouter_1 = __importDefault(require("./routes/recargaRouter"));
const pagosRouter_1 = __importDefault(require("./routes/pagosRouter"));
const confirRouter_1 = __importDefault(require("./routes/confirRouter"));
const cuentaRouter_1 = __importDefault(require("./routes/cuentaRouter"));
//definimos las clases del servidor, lo que nos permitira iniciar el servidor, 
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev')); //la verificacion y respuesta del servidor y tiempo y peticion del cliente
        this.app.use(cors_1.default()); //pedir datos al servidor
        this.app.use(express_1.default.json()); //puede aceptar formatos json
        this.app.use(express_1.default.urlencoded({ extended: false })); //si se desee enviar un correo desde un formulario html.
    }
    routes() {
        this.app.use('/', indexRouter_1.default);
        this.app.use('/api/user', userRouter_1.default);
        this.app.use('/api/recarga', recargaRouter_1.default);
        this.app.use('/api/pagos', pagosRouter_1.default);
        this.app.use('/api/config', confirRouter_1.default);
        this.app.use('/api/cuenta', cuentaRouter_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        }); //para que se quede escuchando
    }
}
const server = new Server();
server.start();
