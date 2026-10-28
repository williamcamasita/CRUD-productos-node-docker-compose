const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('mibd_productos', 'root', '123456', {
    host: 'localhost',
    port: 3333,
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

async function testConexion() {
    try {
        await sequelize.authenticate();
        console.log('CONEXION EXITOSA.');
    } catch (error) {
        console.error('ERROR DE CONEXION CON BD:', error);
    }
}
testConexion(); 

module.exports = sequelize