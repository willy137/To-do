var express = require('express');
var router = express.Router();
var usuarioController=require("../controllers/usuario");

router.get("/login", usuarioController.login)

router.post("/login2", usuarioController.login2)

router.get("/regis", usuarioController.registro);

router.post("/registrado", usuarioController.registrarse);

router.get("/logout",usuarioController.logout)

module.exports = router;
