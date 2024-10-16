import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequestsController } from './friend-request.controller';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequest } from '../users/entities/friend-request.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, User])],
  controllers: [FriendRequestsController],
  providers: [FriendRequestsService],
})
export class FriendRequestsModule {}
