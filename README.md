# Desafío Evaluado - Like Me (Parte I & II) 📸

Aplicación web full-stack inspirada en redes sociales para crear, visualizar, dar me gusta y eliminar publicaciones en tiempo real.

## 🛠️ Tecnologías Utilizadas

- **Node.js & Express.js**: Entorno backend y API RESTful.
- **PostgreSQL**: Base de datos relacional persistente.
- **pg (`Pool`)**: Cliente de PostgreSQL con manejo de errores vía `try...catch`.
- **CORS**: Habilitado para la integración entre frontend y backend.
- **React + Vite**: Interfaz de usuario interactiva.

---

## 🚀 Endpoints de la API Backend

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **GET** | `/posts` | Obtiene el listado completo de publicaciones desde PostgreSQL. |
| **POST** | `/posts` | Registra una nueva publicación[cite: 10]. |
| **PUT** | `/posts/like/:id` | Incrementa el contador de me gusta del post indicado. |
| **DELETE** | `/posts/:id` | Elimina la publicación correspondiente de PostgreSQL. |

---

## 🗄️ Modelo de Base de Datos

```sql
CREATE DATABASE likeme;

\c likeme

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(25),
  img VARCHAR(1000),
  descripcion VARCHAR(255),
  likes INT
);
