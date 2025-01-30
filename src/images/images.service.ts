import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './images.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>
  ) { }

  getImagesByUser(userId: string) {
    return this.imagesRepository.find({
      where: {
        user: {
          id: userId as `${string}-${string}-${string}-${string}-${string}`
        }
      }
    });
  }
  
}
