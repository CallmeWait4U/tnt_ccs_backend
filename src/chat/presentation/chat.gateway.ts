// import { Inject } from '@nestjs/common';
// import {
//   ConnectedSocket,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { RedisImplement } from 'libs/redis.module';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class chatGateway {
//   @Inject()
//   private readonly redisImplement: RedisImplement;
//   @WebSocketServer()
//   server: Server;
//   userOnline: Socket[] = [];

//   @SubscribeMessage('connection')
//   public async handleConnection(@ConnectedSocket() client: Socket) {
//     const token = client.handshake.auth?.token;
//     await this.redisImplement.saveSession(token, client.id);
//     this.userOnline.push(client);
//   }

//   @SubscribeMessage('disconnect')
//   public async handleDisconnect(@ConnectedSocket() client: Socket) {
//     const token = client.handshake.auth?.token;
//     await this.redisImplement.deleteSession(token, client.id);
//     const user = this.userOnline.filter((user) => user.id === client.id)[0];
//     const index = this.userOnline.indexOf(user);
//     if (index > -1) this.userOnline.splice(index, 1);
//   }

//   public async handleNotification(token: string, message: string) {
//     const sids = await this.redisImplement.getClients(token);
//     console.log(sids.length);
//     sids.forEach((sid) => {
//       const user = this.userOnline.filter((user) => user.id === sid)[0];
//       user.send(message);
//     });
//   }
// }
