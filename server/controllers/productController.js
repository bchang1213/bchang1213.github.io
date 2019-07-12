const Product = require('../models/product.js');

//ES 5 syntax
module.exports = {
    createProduct(request, response){
        console.log("Post received. Creating new product.");
        Product.create({
            name: request.body.name,
            description: request.body.description,
            price: request.body.price,
            soldout: request.body.soldout,
            visible: request.body.visible,
            onsale: request.body.onsale
        }).then(function(result){
            response.status(201).send(result);
        }).catch(function(error){
            console.log("Error detected: " + error.message);
        })
    },
    ListProducts(request, response){
        console.log("Received request for listing all products.");
        Product.findAll()
        .then(function(result){
            console.log('Retrieved list from db. Sending to user now.');
            return(result);
        }).catch(function(error){
            console.log("Error occurred when retrieving all products: " + error.message);
        })
    },
};
