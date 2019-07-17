'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    soldout: DataTypes.BOOLEAN,
    visible: DataTypes.BOOLEAN,
    onsale: DataTypes.BOOLEAN
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
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};

/*This defines the contact form. You must
accuartely reflect the contents of this model with its corresponding migration file*/
