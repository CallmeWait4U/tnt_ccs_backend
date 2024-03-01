import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class TestService {
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
  ) {}

  async mockData() {
    //
  }
}
