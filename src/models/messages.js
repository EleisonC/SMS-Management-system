'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    message: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Messages.associate = function(models) {

    Messages.belongsTo(models.Contact,{onDelete:'CASCADE',foreignKey:'senderId',hooks:true})
    Messages.belongsTo(models.Contact,{onDelete:'CASCADE', foreignKey:'receiverId',hooks:true})
  };
  return Messages;
};