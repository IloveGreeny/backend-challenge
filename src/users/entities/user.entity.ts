import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FriendRequest } from './friend-request.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToMany(() => FriendRequest, request => request.sender)
  sentRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, request => request.receiver)
  receivedRequests: FriendRequest[];
}
