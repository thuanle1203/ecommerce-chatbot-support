module.exports = app => {
  
  const order = require("../controller/order.controller.js");

  var router = require("express").Router();
  // Retrieve all order
  router.get("/", order.findAll);
  
  // // Retrieve all published order
  // router.get("/published", order.findAllPublished);
  
  // Retrieve a single Tutorial with id
  router.get("/:businessId/business", order.findByBusinessId);

  router.get("/:id/detail", order.findDetailById);
 
  // Create a new Tutorial
  router.post("/:sessionId/:businessId", order.create);

  // Update a Tutorial with id
  router.put("/:id", order.update);

  // Delete a Tutorial with id
  router.delete("/:id", order.delete);

  // Create a new Tutorial
  router.delete("/", order.deleteAll);

  app.use("/api/order", router);
};

