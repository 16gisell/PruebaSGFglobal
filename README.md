

<h1>Prueba Billetera digital</h1>

<h4 >Componentes Y descripcion</h4>

<p> La aplicación cuenta con los siguientes modulos:
    1	Registro de usuario
    2	Recarga billetera
    3	Pagos de compras
    4	Condigo de confirmación vía correo
    5	Consulta saldo de billetera
    Cabe destacar que la aplicación está bajo entorno vuejs para front-End y back-end  NodeJs Utilizando TypeScript, para base de datos MySQL
    Para sus ejecuciones: 
    
    Paso1: 
    1	montaje Data base al gestor de base de datos MYSQL de tu preferencia (en mi caso he utilizado xammp/phpMyAdmin)
    2	el Archivo que contiene las tablas lo podremos localizar en la carpeta del proyecto llamada DataBase.
    
    Paso2: 
    Iniciar server back-end con los siguientes  commandos  con esto levantamos el servidor para poder comunicarnos con el gestor de base de datos 
    1 npm install	
    2 cd back-end
    3	npm run dev ->nos posicionara en el puerto :3000
    
    Paso3:
    Iniciamos entorno frond-End 
    1 npm install
    2	npm run serve nos posiciona en el Puerto :8080
    Observaciones: 
    3	Para este proyecto he utilizado plantillas para las vista, con la finalidad de acelerar el proceso de trabajo. 
    4	Este proyecto contiene peticiones REST y se utilizó postman para verificar las respuestas, sin embargo se requería peticiones al servicio soap la cual no pudieron ser completadas. 
    
</p>

