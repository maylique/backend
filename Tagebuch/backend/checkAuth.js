import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "No token provided" });
  }
  const [authType, token] = req.headers.authorization.split(" ");
  if (authType !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).send({ message: "Token is invalid" });
  }
};
