import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RedisImplement } from 'libs/redis.module';
import { Server, Socket } from 'socket.io';
import { CreateNotificationDTO } from './dto/create.notification.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @Inject()
  private readonly redisImplement: RedisImplement;
  @WebSocketServer()
  server: Server;
  userOnline: Socket[] = [];

  @SubscribeMessage('connection')
  public async handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.auth?.token;
    // console.log('connect ', token);
    const users = this.userOnline.filter(
      (user) => user.handshake.auth.token === token,
    );
    if (!users || users.length === 0) {
      this.userOnline.push(client);
      await this.redisImplement.saveSession(token, client.id);
    }
    // console.log(this.userOnline);
  }

  @SubscribeMessage('disconnect')
  public async handleDisconnect(@ConnectedSocket() client: Socket) {
    const token = client.handshake.auth?.token;
    // console.log('disconnect ', token);
    await this.redisImplement.deleteSession(token, client.id);
    const user = this.userOnline.filter((user) => user.id === client.id)[0];
    const index = this.userOnline.indexOf(user);
    if (index > -1) {
      this.userOnline.splice(index, 1);
    }
    // console.log(this.userOnline);
  }

  public async handleLogout(token: string) {
    // const token = client.handshake.auth?.token;
    // console.log('disconnect ', token);
    const user = this.userOnline.filter(
      (user) => token === user.handshake.auth?.token,
    )[0];
    const index = this.userOnline.indexOf(user);
    if (index > -1) {
      this.userOnline.splice(index, 1);
      await this.redisImplement.deleteSession(token, user.id);
    }
  }

  public async handleNotification(token: string, message: string) {
    const sids = await this.redisImplement.getClients(token);
    // console.log(sids.length);
    sids.forEach((sid) => {
      const user = this.userOnline.filter((user) => user.id === sid)[0];
      user.send(message);
    });
  }

  public async notifyComplaint(payload: CreateNotificationDTO) {
    for (const token of payload.tokens) {
      const sids = await this.redisImplement.getClients(token);
      if (sids.length !== 0) {
        sids.forEach((sid) => {
          const user = this.userOnline.filter((user) => user.id === sid)[0];
          // console.log(user);
          user.send({
            title: payload.title,
            content: payload.content,
            second:
              (new Date().getTime() - new Date(payload.time).getTime()) / 1000,
          });
        });
      }
    }
  }
}
