// routes/cuenta.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// Obtener datos del usuario
router.get("/:id_usuario", async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, correo_institucional, fecha_registro, es_vendedor FROM usuarios WHERE id_usuario = ?",
      [id_usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error en /cuenta/:id_usuario:", err);
    res.status(500).json({ error: "Error al obtener datos de usuario" });
  }
});

export default router;
