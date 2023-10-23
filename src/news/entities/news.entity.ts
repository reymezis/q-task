import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
