// Declarar solo una vez
let user = JSON.parse(localStorage.getItem("user"));
const mensajesDiv = document.querySelector("#chat-mensajes");
const form = document.querySelector("#form-chat");

// Función para cargar mensajes del usuario logueado
async function cargarMensajes() {
  if (!mensajesDiv) return;

  try {
    const res = await fetch(`/api/chats/${user.id}`);
    const mensajes = await res.json();

    mensajesDiv.innerHTML = "";
    mensajes.forEach(msg => {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${msg.emisor}</strong> (${msg.producto}): ${msg.contenido}`;
      mensajesDiv.appendChild(p);
    });

    mensajesDiv.scrollTop = mensajesDiv.scrollHeight; // siempre al final
  } catch (err) {
    console.error("Error cargando chat", err);
    mensajesDiv.innerHTML = "<p>Error cargando mensajes.</p>";
  }
}

// Enviar mensaje
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const contenido = document.querySelector("#mensaje").value.trim();
  if (!contenido) return;

  // ⚠️ Debes obtener un id_negociacion real según tu app
  const id_negociacion = 1;

  try {
    await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_negociacion, id_emisor: user.id, contenido })
    });
    document.querySelector("#mensaje").value = "";
    cargarMensajes();
  } catch (err) {
    console.error("Error enviando mensaje", err);
  }
});

cargarMensajes();
setInterval(cargarMensajes, 5000);
