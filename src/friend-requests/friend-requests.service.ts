import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { FriendRequest } from '../users/entities/friend-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sendFriendRequest(senderId: number, receiverId: number) {
    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) {
      throw new NotFoundException('User not found');
    }

    const request = this.friendRequestRepository.create({ sender, receiver });
    return await this.friendRequestRepository.save(request);
  }

  async getReceivedRequests(userId: number) {
    return await this.friendRequestRepository.find({
      where: { receiver: { id: userId }, status: 'pending' },
    });
  }

  async acceptRequest(requestId: number) {
    const request = await this.friendRequestRepository.findOne({ where: { id: requestId } });
    if (!request) {
      throw new NotFoundException('Friend request not found');
    }

    request.status = 'accepted';
    return await this.friendRequestRepository.save(request);
  }

  async declineRequest(requestId: number) {
    const request = await this.friendRequestRepository.findOne({ where: { id: requestId } });
    if (!request) {
      throw new NotFoundException('Friend request not found');
    }

    request.status = 'declined';
    return await this.friendRequestRepository.save(request);
  }
}
