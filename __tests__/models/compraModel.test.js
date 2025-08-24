const CompraModel = require("../../src/models/compraModel")

jest.mock("../../src/config/db", () => ({
  query: jest.fn(),
}))

const db = require("../../src/config/db")

describe("Modelo Compra", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("debería obtener todas las compras correctamente", async () => {
    const mockCompras = [
      { id: 1, proveedor_id: 2, total: 100, estado: "Pendiente", proveedor_nombre: "Proveedor1", nombre_empresa: "Empresa1" },
      { id: 2, proveedor_id: 3, total: 200, estado: "Completado", proveedor_nombre: "Proveedor2", nombre_empresa: "Empresa2" },
    ]
    db.query.mockResolvedValue([mockCompras])

    const resultado = await CompraModel.findAll()

    expect(resultado).toEqual(mockCompras)
    expect(db.query).toHaveBeenCalledWith(`
      SELECT c.*, p.nombre AS proveedor_nombre, p.nombre_empresa
      FROM compras c 
      JOIN proveedor p ON c.proveedor_id = p.id
      ORDER BY c.fecha DESC
    `)
  })

  test("debería obtener una compra por ID correctamente", async () => {
    const mockCompra = { id: 1, proveedor_id: 2, total: 100, estado: "Pendiente", proveedor_nombre: "Proveedor1", nombre_empresa: "Empresa1" }
    db.query.mockResolvedValue([[mockCompra]])

    const resultado = await CompraModel.findById(1)

    expect(resultado).toEqual(mockCompra)
    expect(db.query).toHaveBeenCalledWith(
      `
      SELECT c.*, p.nombre AS proveedor_nombre, p.nombre_empresa
      FROM compras c 
      JOIN proveedor p ON c.proveedor_id = p.id
      WHERE c.id = ?
    `,
      [1],
    )
  })

  test("debería crear una compra nueva correctamente", async () => {
    const nuevaCompra = {
      fecha: "2025-08-23",
      proveedor_id: 2,
      total: 150,
      estado: "Pendiente",
    }
    const mockResult = { insertId: 5 }
    db.query.mockResolvedValue([mockResult])

    const resultado = await CompraModel.create(nuevaCompra)

    expect(resultado).toBe(5)
    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO compras (fecha, proveedor_id, total, estado) VALUES (?, ?, ?, ?)",
      ["2025-08-23", 2, 150, "Pendiente"],
    )
  })

  test("debería actualizar una compra correctamente", async () => {
    const datosActualizacion = {
      fecha: "2025-08-24",
      proveedor_id: 3,
      total: 200,
      estado: "Completado",
    }
    db.query.mockResolvedValue()

    await CompraModel.update(1, datosActualizacion)

    expect(db.query).toHaveBeenCalledWith(
      "UPDATE compras SET fecha = ?, proveedor_id = ?, total = ?, estado = ? WHERE id = ?",
      ["2025-08-24", 3, 200, "Completado", 1],
    )
  })

  test("debería eliminar una compra correctamente", async () => {
    db.query.mockResolvedValue()

    await CompraModel.delete(1)

    expect(db.query).toHaveBeenCalledWith("DELETE FROM compras WHERE id = ?", [1])
  })

  test("debería cambiar el estado de una compra", async () => {
    db.query.mockResolvedValue()

    await CompraModel.cambiarEstado(1, "Cancelado")

    expect(db.query).toHaveBeenCalledWith("UPDATE compras SET estado = ? WHERE id = ?", ["Cancelado", 1])
  })

  test("debería manejar errores en la base de datos", async () => {
    const error = new Error("Database error")
    db.query.mockRejectedValue(error)

    await expect(CompraModel.create({ proveedor_id: 1 })).rejects.toThrow("Database error")
  })
})