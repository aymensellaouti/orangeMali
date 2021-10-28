import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'orangeMali',
    });
  }
  async validate(payload) {
    const user = await this.userService.findUserByUsernameOrEmail(
      payload.username,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
