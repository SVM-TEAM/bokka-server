import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { IAuthTokenPayload } from 'src/public/types/common.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies['access_token'];
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PUBLIC_SECRET,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: IAuthTokenPayload) {
    const { userSeq } = payload;
    return { userSeq };
  }
}
