module.exports = app => {
  
  const customers = require("../controller/customer.controller");

  var router = require("express").Router();
  // Retrieve all customers
  router.get("/", customers.findAll);
  
  // // Retrieve all published customers
  // router.get("/published", customers.findAllPublished);
  
  // Retrieve a single Tutorial with id
  router.get("/:id", customers.findOne);
 
  // Create a new Tutorial
  router.post("/", customers.create);

  // Update a Tutorial with id
  router.put("/:id", customers.update);

  // Delete a Tutorial with id
  router.delete("/:id", customers.delete);

  // Create a new Tutorial
  router.delete("/", customers.deleteAll);

  app.use("/api/customers", router);
};

