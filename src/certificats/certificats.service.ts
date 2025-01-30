import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificat } from './certificats.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Image } from 'src/images/images.entity';
@Injectable()
export class CertificatsService {
  constructor(
    @InjectRepository(Certificat)
    private readonly certificatRepository: Repository<Certificat>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async createCertificat(image: Image, userId: string, hidden_data: string) {
    const user = await this.usersRepository.findOneBy({
      id: userId as `${string}-${string}-${string}-${string}-${string}`
    });

    const certificat = new Certificat();
    certificat.user = user;
    certificat.image = image;
    certificat.hidden_data = hidden_data;

    return this.certificatRepository.save(certificat);
  }
}
