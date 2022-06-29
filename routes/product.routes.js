module.exports = app => {
  
  const products = require("../controller/product.controller");

  var router = require("express").Router();
  // Retrieve all products
  router.get("/", products.findAll);
  
  // // Retrieve all published products
  // router.get("/published", products.findAllPublished);

  router.get("/:businessId/business", products.findByBusinessId);

  router.get("/:id", products.findOne);

  // Retrieve a single Tutorial with id
  router.get("/:id", products.findOne);
 
  // Create a new Tutorial
  router.post("/", products.create);

  // Update a Tutorial with id
  router.put("/:id", products.update);

  // Delete a Tutorial with id
  router.delete("/:id", products.delete);

  // Create a new Tutorial
  router.delete("/", products.deleteAll);

  app.use("/api/products", router);
};

