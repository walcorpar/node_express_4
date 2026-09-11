const express = require('express');
const cors = require('cors');
const {
  obtenerPosts,
  agregarPost,
  incrementarLike,
  eliminarPost
} = require('./consultas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET /posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al obtener los posts' });
  }
});

// POST /posts
app.post('/posts', async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    const nuevoPost = await agregarPost(titulo, img, descripcion);
    res.status(201).json(nuevoPost);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al guardar el post' });
  }
});

// Requerimiento 1: Ruta PUT /posts/like/:id
app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postModificado = await incrementarLike(id);
    if (!postModificado) {
      return res.status(404).json({ error: 'El post no existe' });
    }
    res.json(postModificado);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al actualizar los likes' });
  }
});

// Requerimiento 2: Ruta DELETE /posts/:id
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postEliminado = await eliminarPost(id);
    if (!postEliminado) {
      return res.status(404).json({ error: 'El post no existe' });
    }
    res.json({ mensaje: 'Post eliminado con éxito', post: postEliminado });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al eliminar el post' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Like Me (Parte II) corriendo en http://localhost:${PORT}`);
});