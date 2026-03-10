// db/connection.js
// Este módulo centraliza la configuración y creación de conexiones MySQL.
// Así no repetimos código en cada ruta.
const mysql = require('mysql2/promise');

// Configuración básica de la BD (ajusta usuario/contraseña/host según tu entorno)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'tuclave',
    database: 'schema.sql'
};

// Función helper para obtener una conexión nueva
// Se usa con: const conn = await getConnection();
async function getConnection() {
    const conn = await mysql.createConnection(dbConfig);
    return conn;
}

module.exports = {
    dbConfig,
    getConnection,
};