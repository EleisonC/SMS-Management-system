'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {});

  Contact.associate = function(models) {
    // relationships || associations 
    Contact.hasMany(models.Messages,{onDelete:'CASCADE',foreignKey:'senderId',hooks:true})
  };

  return Contact;
};
