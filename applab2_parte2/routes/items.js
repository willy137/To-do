var express = require('express');
var router = express.Router();
var tareasController=require("../controllers/tareas");

router.post("/", tareasController.lista);

router.get("/tareas", tareasController.listar)

router.post("/add", tareasController.agregar);

router.delete("/delete", tareasController.eliminar)

router.post("/modificar", tareasController.modif)

router.get("/modificacion", tareasController.modifica)

router.put("/actualizar",tareasController.actualizar)
module.exports = router;