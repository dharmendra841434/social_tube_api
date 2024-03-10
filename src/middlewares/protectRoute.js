import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    //console.log(authorization);
    //console.log(req, "this is request");
    console.log(!authorization);
    //console.log(!authorization.startsWith("bearer"));
    if (!authorization) {
      return res
        .status(401)
        .json({ status: false, error: "Unauthorized - No Token Provided" });
    }
    const decode = jwt.decode(authorization?.split(" ")[1]);
    if (!decode) {
      return res.status(401).json({ status: false, error: "Invalid Token" });
    }
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
