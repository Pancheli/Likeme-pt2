const pool = require("../db");

const getAllPosts = async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM posts;")
        res.status(200).json(result.rows);
    }catch(err) {
        console.error(err.message);
        res.json({message: "Hemos tenido problemas con la petición"})
    }
}

const createPost = async(req, res) => {
    try {
        const {titulo, url, descripcion} = req.body;
        const sql = "INSERT INTO posts(titulo, img, descripcion) VALUES($1, $2, $3) RETURNING *";
        const result = await pool.query(sql, [titulo, url, descripcion])
        res.status(200).json({mensaje: `nuevo registro ${result.rows}`});
    }catch(err) {
        console.error(err.message);
        res.json({message: "Hemos tenido problemas con la petición"})
    }
}

const modPosts = async(req, res) => {
    const { id } = req.params;
    try {
        const consulta1 = "SELECT likes FROM posts WHERE id = $1";
        let { rows } = await pool.query(consulta1, [id]);
        const likes = rows[0].likes;

        const consulta = "UPDATE posts SET likes = $2 WHERE id = $1 RETURNING *";
        const cantLikes = likes + 1;
        const result = await pool.query(consulta, [id, cantLikes]);
        res.status(200).json({message: true});
    }
    catch(err) {
        console.error(err.message);
        res.json({message: "No hemos podido acceder a su petición"})
    }
}

const deletePosts = async(req, res) => {
    const { id } = req.params;
    try {
        const query = "DELETE from posts WHERE id = $1"
        const values = [id]
        const result = await pool.query(query, values)
        res.status(200).json({message: true});
    }
    catch(err) {
        console.error(err.message);
        res.json({message: "No hemos podido eliminar la publicación"})

    }
}

module.exports = {
    getAllPosts,
    createPost,
    modPosts,
    deletePosts
}