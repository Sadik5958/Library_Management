import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

interface DecodedToken {
  userId: string;
}

// Extend the Request type to include the userId property
interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: DecodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken;

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({});
  }
};
