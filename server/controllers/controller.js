const productController = require("./productController");
const navigationController = require("./navigationController");
const userController = require("./userController");

module.exports = {
    productController,
    userController,
	navigationController,
}

//the server.js file calls the routes.js file to serve Routing. The routes
//file calls THIS file, the controller.js file, to decide which controller
//function should be called.