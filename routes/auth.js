// routes/auth.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

/**
 * POST /api/auth/login
 * Body: { email, contrasenia }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, contrasenia } = req.body;

    if (!email || !contrasenia) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    // ⚠️ NOTA: lo correcto es comparar contraseñas con bcrypt,
    // pero por ahora hacemos comparación directa (como en tu script)
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, correo_institucional, es_vendedor FROM usuarios WHERE correo_institucional = ? AND password_hash = ?",
      [email, contrasenia]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = rows[0];

    res.json({
      message: "Login exitoso",
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo_institucional,
        es_vendedor: user.es_vendedor
      },
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

export default router;
