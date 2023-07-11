var express = require('express');
var router = express.Router();
var listaController=require("../controllers/listas")

//listar Listas
router.get("/", listaController.Listar)
//Agregar elementos
router.post("/add", listaController.agregar)
//vista de modificacion de lista
router.post("/modificar", listaController.modificar)
router.get("/modificacion", listaController.modificacion)
//actualizar lista
router.put("/actualizar", listaController.actualizar)
//modificar elementos
router.delete("/delete",listaController.borrar)
//Lista de archivadas
router.get("/archivadas",listaController.archivadas)
//cambiar estado para que sea archivada
router.put("/archivar", listaController.archivar)
module.exports = router;