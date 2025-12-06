// routes/publicaciones.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// Obtener publicaciones recientes
router.get("/recientes", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM publicaciones ORDER BY fecha_creacion DESC LIMIT 20"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error en /publicaciones/recientes:", err);
    res.status(500).json({ error: "Error al obtener publicaciones" });
  }
});

// Obtener publicaciones de tipo trueque
router.get("/trueque", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM publicaciones WHERE tipo = 'trueque' ORDER BY fecha_creacion DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error en /publicaciones/trueque:", err);
    res.status(500).json({ error: "Error al obtener trueques" });
  }
});

// Publicar un nuevo artículo
router.post("/", async (req, res) => {
  try {
    const { id_usuario, titulo, descripcion, categoria, tipo, precio } = req.body;

    if (!id_usuario || !titulo || !tipo) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    await pool.query(
      "INSERT INTO publicaciones (id_usuario, titulo, descripcion, categoria, tipo, precio) VALUES (?, ?, ?, ?, ?, ?)",
      [id_usuario, titulo, descripcion, categoria, tipo, precio || 0.0]
    );

    res.json({ message: "Artículo publicado con éxito" });
  } catch (err) {
    console.error("Error en /publicaciones:", err);
    res.status(500).json({ error: "Error al publicar artículo" });
  }
});

export default router;
