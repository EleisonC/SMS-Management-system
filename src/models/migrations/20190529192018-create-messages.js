'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      senderId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model:"Contacts",
          key:"id"
        }
      },
      receiverId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model:"Contacts",
          key:"id"
        }
      }, status: {
        type: Sequelize.STRING
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};