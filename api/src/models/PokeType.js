const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
sequelize.define('PokeType', {
    pokemonId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references:{
            model: 'pokemons',
            key: 'id',
        },
    },
    typeId:{
        type: DataTypes.UUID,
        primaryKey: true,
        references:{
            model:'types',
            key: 'id'
        }
    } 
    },{timestamps: false}
    );
};
  