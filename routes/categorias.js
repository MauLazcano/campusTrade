import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET categorías únicas
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DISTINCT categoria FROM publicaciones");
    res.json(rows.map(r => r.categoria));
  } catch (err) {
    console.error("Error en categorías:", err);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

export default router;
