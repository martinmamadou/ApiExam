import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/images/images.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CertificatsService } from 'src/certificats/certificats.service';
import { exiftool } from 'exiftool-vendored';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private certificatService: CertificatsService,
    private jwtService: JwtService
  ) { }

  async handleUploadImage(file: Express.Multer.File, userId: string) {
    if (!file) {
      throw new BadRequestException('Aucun fichier n\'a été envoyé');
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId as `${string}-${string}-${string}-${string}-${string}` }
    });

    if (!user) {
      throw new BadRequestException('Utilisateur non trouvé');
    }

    const editedDir = path.join('uploads', 'edited');
    if (!fs.existsSync(editedDir)) {
      fs.mkdirSync(editedDir);
    }

    const editedPath = path.join(editedDir, file.filename);
    fs.copyFileSync(file.path, editedPath);

    const message = "Message secret";

    try {
      await exiftool.write(editedPath, {
        Comment: message,
        UserComment: message,
      });

      const tempFile = editedPath + '_original';
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }

      const [savedOriginal, savedEdited] = await Promise.all([
        this.imagesRepository.save({
          filename: file.filename,
          path: file.path,
          size: file.size,
          user: user
        }),
        this.imagesRepository.save({
          filename: `edited_${file.filename}`,
          path: editedPath,
          size: file.size,
          user: user
        })
      ]);

      await this.certificatService.createCertificat(savedEdited, userId, message);

      return {
        edited: savedEdited
      };
    } catch (error) {
      if (fs.existsSync(editedPath)) {
        fs.unlinkSync(editedPath);
      }
      throw error;
    }
  }
}
