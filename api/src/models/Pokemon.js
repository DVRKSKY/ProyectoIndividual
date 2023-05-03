const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    stats: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },{timestamps: false}
  );
};
