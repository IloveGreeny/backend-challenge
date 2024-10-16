import { Controller, Post, Get, Param, UseGuards,Request } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('friend-requests')
@UseGuards(AuthGuard('jwt'))
export class FriendRequestsController {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @Post('send/:receiverId')
  async sendFriendRequest(@Param('receiverId') receiverId: number, @Request() req) {
    const senderId = req.user.userId;
    return this.friendRequestsService.sendFriendRequest(senderId, receiverId);
  }

  @Get('received')
  async getReceivedRequests(@Request() req) {
    const userId = req.user.userId;
    return this.friendRequestsService.getReceivedRequests(userId);
  }

  @Post('accept/:requestId')
  async acceptRequest(@Param('requestId') requestId: number) {
    return this.friendRequestsService.acceptRequest(requestId);
  }

  @Post('decline/:requestId')
  async declineRequest(@Param('requestId') requestId: number) {
    return this.friendRequestsService.declineRequest(requestId);
  }
}
