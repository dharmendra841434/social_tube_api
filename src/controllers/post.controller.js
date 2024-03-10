import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { postBy, postBody, likes, comments } = req.body;
    const t = await Post.create({
      postBy: postBy,
      postBody: postBody,
      likes: likes,
      comments: comments,
    });
    return res.status(200).send({
      message: "post created",
      status: true,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: false,
      response: error.message || "Internal Server Error",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(403).send({
        message: " you have no any data ",
        status: false,
        statusCode: 403,
      });
    }
    const id = req.params.id;
    await Post.findByIdAndUpdate(id, req.body);
    const response = await Post.findById(id);
    return res.status(200).send({
      user: response,
      status: true,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: false,
      response: error.message || "Internal Server Error",
    });
  }
};

export { createPost, updatePost };
