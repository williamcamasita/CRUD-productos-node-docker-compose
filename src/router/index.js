
const express = require("express");
const productoController = require("./../controllers/producto.controller");

const router = express.Router();

router.get("/producto", productoController.listar);
router.post("/producto", productoController.guardar);
router.get("/producto/:id", productoController.mostrar);
router.put("/producto/:id", productoController.modificar);
router.delete("/producto/:id", productoController.eliminar);

module.exports = router;
