"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailExito {
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
            subject: 'Informacion transaccion Billetera exito',
            html: `
         <strong>Mensaje:</strong> Su transaccion se ha logrado con exito..
         <strong>siga teniendo un lindo Dia :)</strong>
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
const emailExito = new EmailExito();
exports.default = emailExito;
