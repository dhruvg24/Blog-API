// const jwt = reqiure("jsonwebtoken");
import jwt from 'jsonwebtoken'

export const auth=(req, res, next)=>{
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied...No token provided" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
