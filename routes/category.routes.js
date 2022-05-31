module.exports = app => {
  
  const category = require("../controller/category.controller");

  var router = require("express").Router();
  // Retrieve all category
  router.get("/", category.findAll);
  
  // // Retrieve all published category
  // router.get("/published", category.findAllPublished);
  
  // Retrieve a single Tutorial with id
  router.get("/:id", category.findOne);
 
  // Create a new Tutorial
  router.post("/", category.create);

  // Update a Tutorial with id
  router.put("/:id", category.update);

  // Delete a Tutorial with id
  router.delete("/:id", category.delete);

  // Create a new Tutorial
  router.delete("/", category.deleteAll);

  app.use("/api/category", router);
};

