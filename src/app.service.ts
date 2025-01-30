import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './images/images.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>
  ) { }

  getImages() {
    return this.imagesRepository.find();
  }
}
