"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class Email {
    correo(data) {
        console.log(data, "holaaajo");
        var smtpConfig = {
            pool: true,
            host: 'smtp.gmail.com',
            // service:process.env.SERVICE,
            port: 465,
            // secure: true, 
            secure: true,
            auth: {
                user: 'theygiszjr@gmail.com',
                pass: 'Giszjr*2'
            }
        };
        let transporter = nodemailer_1.default.createTransport(smtpConfig);
        const mailOptions = {
            from: 'correo👻',
            to: data.correo,
            subject: 'Informacion Codigo Billetera',
            html: `
         <strong>Hola!! </strong> Ususario espero que estes Excelente el dia de hoy :)<br/>
         <strong>Usted esta haciendo una accion de ${data.enviado_de}, por un monto de: $ ${data.monto} USD</strong><br/>
         <strong>Si usted no ha solicitado codigo por favor omita este correo.. </strong><br/>
         <strong>CODIGO:</strong> Tu codigo es el siguiente ${data.codigoEnviado_email}<br/>
         <strong>Mensaje:</strong> Verifica que el codigo que anexas sea el mismo que te estamos ofreciendo para tener una respuesta sastisfactoria..
         `
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
    }
}
const email = new Email();
exports.default = email;
