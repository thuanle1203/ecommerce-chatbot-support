module.exports = app => {
  
  const cart = require("../controller/cart.controller");

  var router = require("express").Router();
  // Retrieve all cart
  router.get("/", cart.findAll);
  
  // // Retrieve all published cart
  // router.get("/published", cart.findAllPublished);
  
  // Retrieve a single Tutorial with id
  router.get("/:sessionId", cart.findOne);
 
  // Create a new Tutorial
  router.post("/", cart.create);

  // Update a Tutorial with id
  router.put("/:sessionId", cart.update);

  // Delete a Tutorial with id
  router.delete("/:id", cart.delete);

  // Create a new Tutorial
  router.delete("/", cart.deleteAll);

  app.use("/api/cart", router);
};

