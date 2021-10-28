import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editfileName } from '../Generics/upload-file.utils';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGaurd } from '../auth/guards/role.gaurd';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('cv')
@Roles('role', 'admin')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @Roles('role', 'user')
  @UseGuards(AuthGuard('jwt'), RoleGaurd)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/uploads',
        filename: editfileName,
      }),
    }),
  )
  create(
    @GetUser() user: User,
    @Body() createCvDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file && file.filename) {
      createCvDto.path = 'public/uplaods/' + file.filename;
      createCvDto.user = user;
      console.log(createCvDto.path);
    }
    return this.cvService.create(createCvDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
}
