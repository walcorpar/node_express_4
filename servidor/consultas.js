const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'D4rkn3$$', // Tu contraseña de PostgreSQL
  database: 'likeme',
  allowExitOnIdle: true
});

// Obtener todos los posts
const obtenerPosts = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts ORDER BY id ASC');
    return rows;
  } catch (error) {
    console.error('Error SQL al obtener posts:', error);
    throw error;
  }
};

// Agregar un nuevo post
const agregarPost = async (titulo, img, descripcion) => {
  try {
    const query = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [titulo, img, descripcion, 0];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error SQL al agregar post:', error);
    throw error;
  }
};

// Requerimiento 1: Modificar registro (Incrementar likes)
const incrementarLike = async (id) => {
  try {
    const query = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error SQL al incrementar likes:', error);
    throw error;
  }
};

// Requerimiento 2: Eliminar registro
const eliminarPost = async (id) => {
  try {
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error SQL al eliminar post:', error);
    throw error;
  }
};

module.exports = {
  obtenerPosts,
  agregarPost,
  incrementarLike,
  eliminarPost
};