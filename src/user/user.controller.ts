import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import{diskStorage} from 'multer'
import { Express } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalNameWithoutExtension = file.originalname.split('.').slice(0, -1).join('');
          const filename = `${originalNameWithoutExtension}-${uniqueSuffix}${file.originalname.substr(file.originalname.lastIndexOf('.'))}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    createUserDto.image = file.path;
    return await this.userService.create(createUserDto);
  }
 


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
