const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('score', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      record:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      } 
    },{timestamps: false}
    );
  };
  