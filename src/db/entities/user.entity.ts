import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true, length: 100 })
  userEmail: string;

  @Column({ length: 100 })
  userPassword: string;
}
