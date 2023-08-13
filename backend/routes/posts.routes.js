const { Router } = require("express"),
    {getAllPosts, createPost, modPosts, deletePosts} = require("../controllers/posts.controllers");

const router = Router();

router.get("/posts", getAllPosts);
router.post("/posts", createPost);
router.put("/posts/likes/:id", modPosts);
router.delete("/posts/:id", deletePosts);

module.exports = router;