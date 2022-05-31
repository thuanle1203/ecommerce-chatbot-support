module.exports = app => {
  
  const users = require("../controller/user.controller");

  var router = require("express").Router();
  // Retrieve all users
  router.get("/", users.findAll);
  
  // // Retrieve all published users
  // router.get("/published", users.findAllPublished);
  
  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);
 
  // Create a new Tutorial
  router.post("/", users.create);

  // Update a Tutorial with id
  router.put("/:id", users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Create a new Tutorial
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};

