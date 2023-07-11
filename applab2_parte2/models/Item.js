'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Lista,{foreignKey:"id_lista"})
    }
  }
  Item.init({
    id_items:{type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true},
    titulo: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE,
    fecha_resolucion:DataTypes.DATE,
    descripcion: DataTypes.STRING,
    prioridad:DataTypes.STRING,
    fecha_limite:DataTypes.DATE,
    estado:DataTypes.STRING,
    id_lista:{
        type:DataTypes.INTEGER,
        foreignKey:true
    }
   }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    timestamps:false,
  });
  return Item;
};