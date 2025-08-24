const express = require("express")
const router = express.Router()
const RepuestoController = require("../controllers/repuestoController")
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware")

// Obtener todos los repuestos (requiere token)
router.get("/", verifyToken, RepuestoController.listar)

// Obtener un repuesto por ID (requiere token)
router.get("/:id", verifyToken, RepuestoController.obtener)

// Crear un nuevo repuesto (solo rol Administrador: id = 1)
router.post("/", verifyToken, authorizeRoles(1), RepuestoController.crear)

// Actualizar un repuesto existente (solo rol Administrador)
router.put("/:id", verifyToken, authorizeRoles(1), RepuestoController.actualizar)

// Cambiar estado de repuesto (corregir la ruta)
router.put("/:id/cambiar-estado", verifyToken, authorizeRoles(1), RepuestoController.cambiarEstado)

// Eliminar un repuesto (solo rol Administrador)
router.delete("/:id", verifyToken, authorizeRoles(1), RepuestoController.eliminar)

module.exports = router
