import { Controller, Get, Req } from '@nestjs/common';
import { ImagesService } from './images.service';
import { User } from 'src/users/users.entity';

@Controller('mes-images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  getImagesByUser(@Req() req: Request & { user: User, headers: { authorization: string } }) {
    return this.imagesService.getImagesByUser(req.user.id);
  }
}
