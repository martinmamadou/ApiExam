import { User } from 'src/users/users.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Image } from 'src/images/images.entity';

@Entity({ name: 'certificat' })
export class Certificat {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  hidden_data: string;

  @OneToOne(() => Image, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;
}
