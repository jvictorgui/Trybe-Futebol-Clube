import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  email: string,
  role: string,
};

export default class Validation {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const realToken = (token as string).split(' ')[1];
    try {
      const data = jwt.verify(realToken, secret) as TokenPayload;
      res.locals = data;

      next();
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
