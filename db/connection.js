// db/connection.js
// Este módulo centraliza la configuración y creación de conexiones MySQL.
// Así no repetimos código en cada ruta.
const mysql = require('mysql2/promise');

// Configuración básica de la BD (ajusta usuario/contraseña/host según tu entorno)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'minierp',
    waitForConnections: true,
    connectionLimit: 10
});

// Función helper para obtener una conexión nueva
// Se usa con: const conn = await getConnection();
module.exports = pool;