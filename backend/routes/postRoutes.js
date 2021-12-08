const express = require("express");
const { check } = require("express-validator");
const {createPost,getAllPosts, getAllPostsByFollowing } = require("../controllers/postController");
const auth = require("../middlewares/authMiddleware");


const router = express.Router();

const validatePost = [check("image", "Image is required").not().isEmpty()];

router.post("/", auth, validatePost, createPost)
router.get("/", auth, getAllPosts)
router.get("/following", auth, getAllPostsByFollowing)


module.exports=router