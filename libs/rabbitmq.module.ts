import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: `amqp://admin:abc12345@localhost:5672`,
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
  ],
  providers: [],
  exports: [RabbitMQModule],
})
export class RabbitMqModule {}
