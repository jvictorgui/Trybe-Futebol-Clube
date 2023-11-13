import { Request, Response, NextFunction } from 'express';

export default class ValidateLogin {
  static validateEmailnPassword(req: Request, res: Response, next: NextFunction) {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(.{6,})$/;
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
