import { Controller, Post, UploadedFile, UseInterceptors, UseGuards, Req, Get, Param, Res, NotFoundException, BadRequestException } from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/images/images.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('image')
export class UploadImageController {
  constructor(
    private readonly uploadImageService: UploadImageService,
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>
  ) { }

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request & { user: User }
  ) {
    return this.uploadImageService.handleUploadImage(file, req.user.id);
  }

  @Get('download/:id')
  async downloadEditedImage(
    @Param('id') id: number,
    @Res() res: Response
  ) {
    const image = await this.imagesRepository.findOne({
      where: { id: id }
    });

    if (!image) {
      throw new NotFoundException('Image non trouvée');
    }

    // Vérifier que c'est une image éditée
    if (!image.filename.startsWith('edited_')) {
      throw new BadRequestException('Cette image n\'est pas une version éditée');
    }

    const filePath = image.path;
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Fichier non trouvé');
    }

    res.download(filePath, image.filename);
  }
}
