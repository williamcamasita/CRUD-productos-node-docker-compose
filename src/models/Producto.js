const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./conexion");


const Producto = sequelize.define(
  'nombre',
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(12.2),
      // allowNull defaults to true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
    descripcion: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
    },
    imagen: {
      type: DataTypes.STRING(255),
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  },
);

Producto.sync();

module.exports = Producto;