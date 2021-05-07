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
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
// import * as utils from '../utils/utils';
// tslint:disable-next-line: no-var-requires
const hbs = require('nodemailer-express-handlebars');
// Configuración de handlebars
const hbsConfig = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path_1.default.join(__dirname, '../views/'),
        layoutsDir: path_1.default.join(__dirname, '../views/'),
        defaultLayout: ''
    },
    viewPath: path_1.default.join(__dirname, '../views/'),
    extName: '.hbs'
};
// Configuración transportador NodeMailer
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: { user: process.env.USER, pass: process.env.PASSWORD }
});
/**
 * Envia un correo al administrador y copia a los involucrados en el evento
 * @param incident : Incident
 */
function notifyNewIncident() {
    return __awaiter(this, void 0, void 0, function* () {
        transporter.use('compile', hbs(hbsConfig));
        //   const ccValues = [];
        //   if (incident.assignedTo !== incident.createdBy) {
        //     ccValues.push(incident.createdBy);
        //     ccValues.push(incident.assignedTo);
        //   } else {
        //     ccValues.push(incident.createdBy);
        //   }
        const email = {
            from: 'Soporte Neox',
            to: process.env.USER,
            cc: process.env.USER,
            subject: '👀 Hola ',
            template: 'newIncident',
            context: "contenido"
        };
        yield transporter.sendMail(email).catch((error) => {
            error(error);
        });
    });
}
exports.default = notifyNewIncident;
