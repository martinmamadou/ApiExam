import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from 'src/images/images.entity';
import { Certificat } from 'src/certificats/certificats.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: UUID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  isAdmin: boolean;

  @OneToMany(() => Image, (image) => image.user)
  images?: Image[];

  @OneToMany(() => Certificat, (certificat) => certificat.user)
  certificats?: Certificat[];
}
