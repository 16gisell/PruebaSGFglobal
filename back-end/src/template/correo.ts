import nodemailer from 'nodemailer';
class Email{ 
   correo(data:any){
      console.log(data, "holaaajo")
      var smtpConfig = {
         pool:true,
         host: 'smtp.gmail.com',
         // service:process.env.SERVICE,
         port: 465, //587 o 465 o534
        // secure: true, 
         secure: true,
         auth: {
            user: 'theygiszjr@gmail.com',
            pass: 'Giszjr*2' 
         }
     };
      let transporter = nodemailer.createTransport(smtpConfig);
      const mailOptions = {
         from: 'correo👻',
         to: data.correo, // Cambia esta parte por el destinatario
         subject: 'Informacion Codigo Billetera',
         html: `
         <strong>Hola!! </strong> Ususario espero que estes Excelente el dia de hoy :)<br/>
         <strong>Usted esta haciendo una accion de ${data.enviado_de}, por un monto de: $ ${data.monto} USD</strong><br/>
         <strong>Si usted no ha solicitado codigo por favor omita este correo.. </strong><br/>
         <strong>CODIGO:</strong> Tu codigo es el siguiente ${data.codigoEnviado_email}<br/>
         <strong>Mensaje:</strong> Verifica que el codigo que anexas sea el mismo que te estamos ofreciendo para tener una respuesta sastisfactoria..
         `
      };
      transporter.sendMail(mailOptions, function (err:any, info:any) {
         if (err){
            console.log(err)
         }else{
            console.log(info);
         }
         
      });
   }
}
const email = new Email();
export default email;