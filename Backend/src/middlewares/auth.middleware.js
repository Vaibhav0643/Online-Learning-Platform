import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/index.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.userId;
    req.userEmail = decoded.userEmail;
    req.userType = decoded.userType;
    next();
  });
};

export { verifyToken };
