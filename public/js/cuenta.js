let user = JSON.parse(localStorage.getItem("user"));

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(`/api/cuenta/${user.id}`);
    const datos = await res.json();

    const div = document.querySelector("#datos-cuenta");
    div.innerHTML = `
      <h2>${datos.nombre}</h2>
      <p><strong>Correo institucional:</strong> ${datos.correo_institucional}</p>
      <p><strong>Registrado desde:</strong> ${new Date(datos.fecha_registro).toLocaleDateString()}</p>
      <p><strong>Rol:</strong> ${datos.es_vendedor ? "Vendedor" : "Comprador"}</p>
    `;
  } catch (err) {
    console.error("Error cargando cuenta", err);
    document.querySelector("#datos-cuenta").innerHTML = "<p>Error al cargar los datos del usuario.</p>";
  }
});
