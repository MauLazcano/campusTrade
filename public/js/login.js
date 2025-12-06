const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.querySelector('input[type="email"]').value;
  const contrasenia = form.querySelector('input[type="password"]').value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contrasenia })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/html/inicio.html";
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error de conexión");
  }
});
