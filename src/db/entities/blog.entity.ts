import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;
}
