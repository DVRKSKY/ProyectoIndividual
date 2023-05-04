const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    imagenGame: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    poderes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    vida: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ataque: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    defensa: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ataqueEspecial: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    defenzaEspecial: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    altura: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    peso: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tipo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, { timestamps: false });
};
