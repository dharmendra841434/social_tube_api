import mongoose, { Schema } from "mongoose";

const commentSchem = new Schema(
  {
    commentBy: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new Schema(
  {
    postBy: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    postBody: {
      type: String,
      lowecase: true,
      trim: true,
      required: true,
    },
    likes: {
      type: Array,
      required: true,
    },
    comments: [commentSchem],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("post", postSchema);
