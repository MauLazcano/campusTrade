import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import publicacionesRoutes from "./routes/publicaciones.js";
import categoriasRoutes from "./routes/categorias.js";
import truequeRoutes from "./routes/trueque.js";
import chatsRoutes from "./routes/chats.js";
import cuentaRoutes from "./routes/cuenta.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/publicaciones", publicacionesRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/trueque", truequeRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/cuenta", cuentaRoutes);

// Archivos estáticos
app.use(express.static("public"));

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/html/login.html");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 CampusTrade corriendo en http://localhost:${PORT}`);
});
