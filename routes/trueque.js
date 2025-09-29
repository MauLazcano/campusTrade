import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET publicaciones de trueque
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM publicaciones WHERE tipo = 'trueque' ORDER BY fecha_creacion DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error en trueque:", err);
    res.status(500).json({ error: "Error al obtener publicaciones de trueque" });
  }
});

export default router;
