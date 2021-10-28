import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import * as faker from 'faker';
import { Skill } from '../skill/entities/skill.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CvService } from '../cv/cv.service';
import { Cv } from '../cv/entities/cv.entity';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // application logic...

  //Remplissage de la base ed données
  // Todo: seed Skill
  console.log('Seed Skill loading...');
  const skillService = app.get(SkillService);
  const skills = [];
  for (let i = 1; i < 10; i++) {
    const skill = new Skill();
    skill.designation = faker.name.jobArea();
    const createdSkill = await skillService.create(skill);
    skills.push(createdSkill);
  }
  // Todo: seed User
  console.log('Seed User loading...');
  const userService = app.get(UserService);
  const users = [];
  for (let i = 1; i < 10; i++) {
    const user = new User();
    user.email = faker.internet.email();
    user.username = faker.internet.userName();
    user.password = 'pwd';
    const createdUser = await userService.create(user);
    users.push(createdUser);
  }
  // Todo: seed User
  console.log('Seed Cv loading...');
  const cvService = app.get(CvService);
  for (let i = 1; i < 10; i++) {
    const cv = new Cv();
    cv.name = faker.name.lastName();
    cv.firstname = faker.name.firstName();
    cv.age = faker.datatype.number(65);
    cv.cin = `cin${i}`;
    cv.job = faker.name.jobTitle();
    cv.path = 'as.jpg';
    cv.user = users[faker.datatype.number(8) + 1];
    cv.skills = [];
    const nbSkill = faker.datatype.number(8) + 1;
    for (let i = 0; i < nbSkill; i++) {
      cv.skills.push(skills[i]);
    }
    await cvService.create(cv);
  }
  await app.close();
}
bootstrap();
