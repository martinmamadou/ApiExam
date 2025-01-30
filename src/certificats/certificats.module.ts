import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificatsService } from './certificats.service';
import { Certificat } from './certificats.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificat, User])],
  providers: [CertificatsService],
  exports: [CertificatsService]
})
export class CertificatsModule {}
