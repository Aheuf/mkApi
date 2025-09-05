import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ROLE } from "../constants";
import { Request, Response, NextFunction } from 'express';

export function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

export function generateAccessToken(username: string, role: ROLE) {
    if(!process.env.TOKEN_SECRET) throw new Error("TOKEN_SECRET is not defined");
    return jwt.sign({username, role}, process.env.TOKEN_SECRET, { expiresIn: '24H' });
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) {
        console.log(err);
        return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}
