module.exports = app => {
  
  const business = require("../controller/business.controller");

  var router = require("express").Router();
  // Retrieve all business
  router.get("/", business.findAll);
  
  // // Retrieve all published business
  // router.get("/published", business.findAllPublished);
  
  // Retrieve a single Tutorial with id
  router.get("/:id", business.findOne);
 
  // Create a new Tutorial
  router.post("/", business.create);

  // Update a Tutorial with id
  router.put("/:id", business.update);

  // Delete a Tutorial with id
  router.delete("/:id", business.delete);

  // Create a new Tutorial
  router.delete("/", business.deleteAll);

  app.use("/api/business", router);
};

