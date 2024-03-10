import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSignup = async (req, res) => {
  try {
    const {
      fullName,
      profilePic,
      gender,
      email,
      password,
      followers,
      following,
      posts,
    } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(403).json({
        status: false,
        message: ` user already register with ${email} `,
      });
    }
    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
      sameSite: "none",
    };
    if ([fullName, gender, password].some((field) => field?.trim() === "")) {
      return res.status(403).json({
        status: false,
        message: ` fullName,gender and password are required `,
      });
    }
    const hasPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName: fullName,
      profilePic: profilePic,
      gender: gender,
      email: email,
      password: hasPassword,
      followers: followers,
      following: following,
      posts: posts,
    });
    const accessToken = user.generateAccessToken();

    return res.status(200).cookie("accessToken", accessToken, options).send({
      status: true,
      statusCode: 200,
      message: "signup completed",
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: false,
      response: error.message || "Internal Server Error",
    });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: false,
        mesage: "invalid email ",
      });
    }
    const isPasswordCorrect = await user?.isPasswordCorrect(password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res.status(404).json({
        status: false,
        mesage: "wrong password",
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
      sameSite: "none",
    };
    const accessToken = user.generateAccessToken();
    const resp = await User?.findById(user?._id)?.select("-password");
    return res.status(200).cookie("accessToken", accessToken, options).send({
      status: true,
      statusCode: 200,
      user: resp,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: false,
      response: error.message || "Internal Server Error",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      posts,
      following,
      followers,
      gender,
      profilePic,
      fullName,
      email,
      password,
    } = req.body;
    if ([fullName, gender].some((field) => field?.trim() === "")) {
      return res.status(403).json({
        status: false,
        message: `fullName and gender are required!!`,
      });
    }
    if (email) {
      return res.status(403).json({
        status: false,
        message: `You will not change your email`,
      });
    }
    if (password) {
      return res.status(403).json({
        status: false,
        message: `You will not change your password`,
      });
    }
    await User.findByIdAndUpdate(id, {
      fullName,
      gender,
      posts,
      followers,
      following,
      profilePic,
    });

    const response = await User.findById(id);
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
const getUserData = async (req, res) => {
  try {
    const accessToken = req.params.token;
    //console.log(userId);
    const decode = jwt.decode(accessToken);
    // console.log(decode);
    const id = decode?._id;
    const loggedInUser = await User.findById(id).select("-password ");
    if (!loggedInUser) {
      return res.status(404).send({
        error: true,
        message: "Invalid token!!",
      });
    }

    return res.status(200).send({
      user: loggedInUser,
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
const getUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id).select(
      "-password -email -updatedAt -createdAt -posts"
    );
    if (!loggedInUser) {
      return res.status(404).send({
        error: true,
        message: "Invalid user id!!",
      });
    }
    return res.status(200).send({
      user: loggedInUser,
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

export { userSignup, userLogin, updateUser, getUserData, getUsers };
