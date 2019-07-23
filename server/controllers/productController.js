const Product = require('../models').Product;

//ES 5 syntax
module.exports = {
    createProduct(request, response){
        console.log("Received request to create new product.");
        Product.create({
            name: request.body.name,
            description: request.body.description,
            url: request.body.url,
            price: request.body.price,
            soldout: request.body.soldout,
            visible: request.body.visible,
            onsale: request.body.onsale
        }).then(function(result){
            console.log('Product Saved: ' + result);
        }).catch(function(error){
            console.log("Error detected: " + error.message);
        })
    },
    renderStore(req, res){
        console.log("Received request for listing all products.");
        Product.findAll()
        .then(function(result){
            console.log('Retrieved list from db. Sending to user now.');
            var products = result;
            res.render('store', {
                products: products
            });
        }).catch(function(error){
            console.log("Error occurred when retrieving all products: " + error.message);
        })
    },
    renderProduct(req, res){
        console.log("Received request to view one product.");
        var productID = req.params.productID;
        Product.findByPk(productID)
        .then(function(result){
            res.render('product', {
                product: result
            });
        })
        .catch(function(){
            console.log("Error occurred when retrieving one product: " + error.message);
        })
        
    },
};
