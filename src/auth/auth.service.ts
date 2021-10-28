import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  subscribe(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findUserByUsernameOrEmail(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword != user.password) {
      throw new UnauthorizedException('Bad credentials');
    }
    const payload = {
      username,
      email: user.email,
      role: user.role,
    };
    const jwt = this.jwtService.sign(payload);

    return { jwt };
  }
}
