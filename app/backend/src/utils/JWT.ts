import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  email: string,
  role: string,
};

export default class JwtService {
  static sign(payload: TokenPayload): string {
    const token = jwt.sign(payload, secret);
    return token;
  }
}
