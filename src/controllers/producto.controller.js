const Producto = require("../models/Producto");

async function listar(req, res) {
  const productos = await Producto.findAll();
  return res.json(productos);
}

async function guardar(req, res) {
  const producto = await Producto.create(req.body);
  return res.status(201).json({ mensaje: "Producto registrado", producto });
}

async function mostrar(req, res) {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);
  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }
  return res.json(producto);
}

async function modificar(req, res) {
  const { id } = req.params;
  const [actualizados] = await Producto.update(req.body, {
    where: { id },
  });
  if (actualizados === 0) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }
  const productoActualizado = await Producto.findByPk(id);
  return res.json({ mensaje: "Producto actualizado", producto: productoActualizado });
}

async function eliminar(req, res) {
  const { id } = req.params;
  const eliminado = await Producto.destroy({
    where: { id },
  });
  if (eliminado === 0) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }
  return res.json({ mensaje: "Producto eliminado" });
}

module.exports = {
  listar,
  guardar,
  mostrar,
  modificar,
  eliminar,
};