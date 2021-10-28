import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../Generics/crud.service';
import { User, UserRoleEnum } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Vérifie le username et email
    const { username, email, password } = createUserDto;
    let user = await this.userRepository.findOne({ username, email });
    //Si existe on throw exception
    if (user) {
      throw new BadRequestException('email ou user existe déjà');
    }
    //Sinon
    //crypter le mot de passe et on ajoute le user
    user = this.userRepository.create(createUserDto);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    user.role = Date.now() % 2 ? UserRoleEnum.user : UserRoleEnum.admin;
    const newUser = await this.userRepository.save(user);
    delete newUser.salt;
    delete newUser.password;
    return newUser;
  }

  async findUserByUsernameOrEmail(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: [{ username }, { email: username }],
    });
  }
}
