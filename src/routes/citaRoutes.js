// src/routes/citaRoutes.js
const express = require("express")
const router = express.Router()
const CitaController = require("../controllers/citaController")
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware")

// Rutas públicas (requieren autenticación pero no roles específicos)
router.get("/", verifyToken, CitaController.listar)
router.get("/cliente/:clienteId", verifyToken, CitaController.obtenerPorCliente)
router.get("/mecanico/:mecanicoId", verifyToken, CitaController.obtenerPorMecanico)
router.get("/fecha/:fecha", verifyToken, CitaController.obtenerPorFecha)
router.get("/estado/:estadoId", verifyToken, CitaController.obtenerPorEstado)
router.get("/disponibilidad/mecanicos", verifyToken, CitaController.verificarDisponibilidadMecanicos)

// Rutas de historial
router.get("/historial/cliente/:clienteId", verifyToken, CitaController.obtenerHistorialPorCliente)
router.get("/historial/vehiculo/:vehiculoId", verifyToken, CitaController.obtenerHistorialPorVehiculo)
router.get("/:id/historial", verifyToken, CitaController.obtenerHistorial)

router.get("/:id", verifyToken, CitaController.obtener)

// Rutas que requieren ser administrador o cliente
router.post("/", verifyToken, authorizeRoles(1, 2), CitaController.crear)
router.put("/:id", verifyToken, authorizeRoles(1, 2), CitaController.actualizar)

// Rutas que solo pueden ser accedidas por administradores
router.put("/:id/cambiar-estado", verifyToken, authorizeRoles(1), CitaController.cambiarEstado)
router.delete("/:id", verifyToken, authorizeRoles(1), CitaController.eliminar)

module.exports = router
