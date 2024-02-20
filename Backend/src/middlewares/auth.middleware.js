import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/index.js";

const verifyToken = (req, res, next) => {
  const tokenFromCookie = req.cookies.token;
  const tokenFromHeader = req.headers.authorization;

  if (!tokenFromCookie && !tokenFromHeader) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  let token;

  if (tokenFromCookie) {
    token = tokenFromCookie;
  } else if (tokenFromHeader) {
    const [, tokenValue] = tokenFromHeader.split(" ");
    token = tokenValue;
  }

  console.log(token);

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
