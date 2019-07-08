'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.BIGINT,
    country: DataTypes.STRING
  }, {
    schema: 'cobrinha',
    classMethods: {
        method1: function() {},
        method2: function() {}
    },
    instanceMethods: {
        method3: function() {}
    }
});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

/*This defines the contact form. You must
accuartely reflect the contents of this model with its corresponding migration file*/