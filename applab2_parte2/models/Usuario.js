'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    id:{type: DataTypes.INTEGER,
    primaryKey:true},
    nom_usuario:{
      type:DataTypes.STRING,
      unique:true
    },
    nombre_completo:DataTypes.STRING,
    password:DataTypes.STRING
  
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName:'usuarios',
    timestamps:false
  });
  return Usuario;
};