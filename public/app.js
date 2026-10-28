const API_URL = "/producto";

async function listarProductos() {
  const response = await fetch(API_URL);
  const productos = await response.json();
  const tbody = document.getElementById("productosTableBody");
  tbody.innerHTML = "";

  productos.forEach((producto) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.firstName || ""}</td>
      <td>$${producto.precio || 0}</td>
      <td>${producto.cantidad || 0}</td>
      <td>${producto.descripcion || ""}</td>
      <td>${producto.imagen ? `<img src="${producto.imagen}" width="50">` : ""}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarProducto(${producto.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("productoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const productoId = document.getElementById("productoId").value;
  const producto = {
    firstName: document.getElementById("firstName").value,
    precio: document.getElementById("precio").value,
    cantidad: document.getElementById("cantidad").value,
    descripcion: document.getElementById("descripcion").value,
    imagen: document.getElementById("imagen").value,
  };

  if (productoId) {
    await fetch(`${API_URL}/${productoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
  }

  document.getElementById("productoForm").reset();
  document.getElementById("productoId").value = "";
  document.getElementById("formTitle").textContent = "Agregar Producto";
  document.getElementById("btnGuardar").textContent = "Guardar";
  document.getElementById("btnCancelar").style.display = "none";

  listarProductos();
});

document.getElementById("btnCancelar").addEventListener("click", () => {
  document.getElementById("productoForm").reset();
  document.getElementById("productoId").value = "";
  document.getElementById("formTitle").textContent = "Agregar Producto";
  document.getElementById("btnGuardar").textContent = "Guardar";
  document.getElementById("btnCancelar").style.display = "none";
});

async function editarProducto(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const producto = await response.json();

  document.getElementById("productoId").value = producto.id;
  document.getElementById("firstName").value = producto.firstName || "";
  document.getElementById("precio").value = producto.precio || "";
  document.getElementById("cantidad").value = producto.cantidad || "";
  document.getElementById("descripcion").value = producto.descripcion || "";
  document.getElementById("imagen").value = producto.imagen || "";

  document.getElementById("formTitle").textContent = "Editar Producto";
  document.getElementById("btnGuardar").textContent = "Actualizar";
  document.getElementById("btnCancelar").style.display = "inline-block";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function eliminarProducto(id) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    listarProductos();
  }
}

listarProductos();
