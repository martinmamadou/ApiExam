import { Certificat } from 'src/certificats/certificats.entity';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'image' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user?: User;

  @OneToOne(() => Certificat, certificat => certificat.image)
  certificat?: Certificat;
}
