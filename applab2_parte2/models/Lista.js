'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {    
      Lista.hasMany(models.Item,{foreignKey:"id_lista"});
    }
  }
  Lista.init({
    id_lista:{type:DataTypes.INTEGER,
      primaryKey:true,
    autoIncrement:true},
    titulo: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE,
    fecha_resolucion:DataTypes.DATE,
    estado:DataTypes.STRING,
    activa:DataTypes.BOOLEAN,
    id_usuario:DataTypes.INTEGER},
    {
    sequelize,
    modelName: 'Lista',
    tableName:'lista_tareas',
    timestamps:false
  });
  return Lista;
};