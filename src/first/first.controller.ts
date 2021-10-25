import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('first')
export class FirstController {
  @Get('')
  showGet(): string {
    console.log('GET');
    return 'GET';
  }
  @Post('')
  showPost(): string {
    console.log('Post');
    return 'Post';
  }
  @Put('')
  showPut(): string {
    console.log('Put');
    return 'Put';
  }
  @Patch('')
  showPatch(): string {
    console.log('Patch');
    return 'Patch';
  }
  @Delete('')
  showDelete(): string {
    console.log('Delete');
    return 'Delete';
  }
}
