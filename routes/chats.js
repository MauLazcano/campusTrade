// routes/chats.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// Obtener mensajes de un usuario
router.get("/:id_usuario", async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const [rows] = await pool.query(
      `SELECT m.id_mensaje, m.contenido, m.fecha_envio,
              u.nombre AS emisor, p.titulo AS producto
       FROM mensajes m
       JOIN usuarios u ON m.id_emisor = u.id_usuario
       JOIN negociaciones n ON m.id_negociacion = n.id_negociacion
       JOIN publicaciones p ON n.id_publicacion = p.id_publicacion
       WHERE n.id_usuario_interesado = ? OR p.id_usuario = ?
       ORDER BY m.fecha_envio ASC`,
      [id_usuario, id_usuario]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error en /chats/:id_usuario:", err);
    res.status(500).json({ error: "Error al obtener mensajes" });
  }
});

// Enviar un nuevo mensaje
router.post("/", async (req, res) => {
  try {
    const { id_negociacion, id_emisor, contenido } = req.body;

    if (!id_negociacion || !id_emisor || !contenido) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    await pool.query(
      "INSERT INTO mensajes (id_negociacion, id_emisor, contenido) VALUES (?, ?, ?)",
      [id_negociacion, id_emisor, contenido]
    );

    res.json({ message: "Mensaje enviado" });
  } catch (err) {
    console.error("Error en POST /chats:", err);
    res.status(500).json({ error: "Error al enviar mensaje" });
  }
});

export default router;
