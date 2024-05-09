import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: `amqps://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@${process.env.RMQ_URL}`,
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
  ],
  providers: [],
  exports: [RabbitMQModule],
})
export class RmqModule {}
