import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCompanyCommand } from '../application/command/create.company.command';
import { ListCompanyQuery } from '../application/query/list.company.query';
import { CreateCompanyDTO } from './dto/create.company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('all')
  async findAllCompany() {
    const query = new ListCompanyQuery();
    return await this.queryBus.execute(query);
  }

  @Post('create')
  async createCompany(@Body() b: CreateCompanyDTO) {
    const command = new CreateCompanyCommand(b);
    await this.commandBus.execute(command);
  }
}
