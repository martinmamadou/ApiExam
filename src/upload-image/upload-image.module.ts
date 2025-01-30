import { BadRequestException, Module } from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { UploadImageController } from './upload-image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/images/images.entity';
import { User } from 'src/users/users.entity';
import { CertificatsModule } from 'src/certificats/certificats.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UploadImageController],
  providers: [UploadImageService],
  imports: [
    TypeOrmModule.forFeature([Image, User]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        }
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only .png, .jpg and .jpeg format allowed'), false);
        }
      }
    }),
    CertificatsModule,
    JwtModule
  ]
})
export class UploadImageModule { }


