module.exports = app => {
  
    const auth = require("../controller/auth.controller");
    const user = require("../controller/user.controller");
  
    var router = require("express").Router();

    router.post("/login", auth.login);

    router.post("/signup", user.create);
  
    app.use("/api/auth", router);
  };
  
  