'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id_items: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      fecha_creacion:{
        type: Sequelize.DATE
      },
      fecha_resolucion:{
        type:Sequelize.DATE
      },
      descripcion:{
        type:Sequelize.STRING
      },
      prioridad:{
        type:Sequelize.STRING
      },
      fecha_limite:{
        type:Sequelize.DATE
      },
      estado:{
        type:Sequelize.STRING
      },
      lista:{
        type:Sequelize.INTEGER,
        References:{
          model:'Lista',
          key:'id_lista'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  }
};