// src/controllers/citaController.js
const CitaService = require("../services/citaService")
const HistorialCitaModel = require("../models/historialCitaModel")

const CitaController = {
  async listar(req, res) {
    try {
      const citas = await CitaService.listar()
      res.json(citas)
    } catch (error) {
      res.status(500).json({ error: "Error al listar las citas" })
    }
  },

  async obtener(req, res) {
    try {
      const cita = await CitaService.obtener(req.params.id)
      if (!cita) {
        return res.status(404).json({ error: "Cita no encontrada" })
      }
      res.json(cita)
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la cita" })
    }
  },

  async obtenerPorCliente(req, res) {
    try {
      const citas = await CitaService.obtenerPorCliente(req.params.clienteId)
      res.json(citas)
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las citas del cliente" })
    }
  },

  async obtenerPorMecanico(req, res) {
    try {
      const citas = await CitaService.obtenerPorMecanico(req.params.mecanicoId)
      res.json(citas)
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las citas del mecánico" })
    }
  },

  async obtenerPorFecha(req, res) {
    try {
      const citas = await CitaService.obtenerPorFecha(req.params.fecha)
      res.json(citas)
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las citas por fecha" })
    }
  },

  async obtenerPorEstado(req, res) {
    try {
      const citas = await CitaService.obtenerPorEstado(req.params.estadoId)
      res.json(citas)
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las citas por estado" })
    }
  },

  async crear(req, res) {
    try {
      const id = await CitaService.crear(req.body)
      res.status(201).json({ message: "Cita creada", id })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async actualizar(req, res) {
    try {
      await CitaService.actualizar(req.params.id, req.body)
      res.json({ message: "Cita actualizada" })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async eliminar(req, res) {
    try {
      await CitaService.eliminar(req.params.id)
      res.json({ message: "Cita eliminada" })
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la cita" })
    }
  },

  async cambiarEstado(req, res) {
    try {
      const nuevoEstado = await CitaService.cambiarEstado(req.params.id, req.body.estado_cita_id)
      res.json({ message: "Estado de cita actualizado" })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async verificarDisponibilidadMecanicos(req, res) {
    try {
      const { fecha, hora } = req.query
      if (!fecha || !hora) {
        return res.status(400).json({ error: "Fecha y hora son requeridas" })
      }

      const mecanicosDisponibles = await CitaService.verificarDisponibilidadMecanicos(fecha, hora)
      res.json(mecanicosDisponibles)
    } catch (error) {
      res.status(500).json({ error: "Error al verificar la disponibilidad de mecánicos" })
    }
  },

  async obtenerHistorial(req, res) {
    try {
      const historial = await HistorialCitaModel.obtenerPorCita(req.params.id)
      res.json(historial)
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el historial de la cita" })
    }
  },

  async obtenerHistorialPorCliente(req, res) {
    try {
      const historial = await HistorialCitaModel.obtenerPorCliente(req.params.clienteId)
      res.json(historial)
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el historial del cliente" })
    }
  },

  async obtenerHistorialPorVehiculo(req, res) {
    try {
      const historial = await HistorialCitaModel.obtenerPorVehiculo(req.params.vehiculoId)
      res.json(historial)
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el historial del vehículo" })
    }
  },
}

module.exports = CitaController
