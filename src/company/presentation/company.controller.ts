import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCompanyCommand } from '../application/command/create.company.command';
import { FindAllQuery } from '../application/query/find.all.query';
import { CreateCompanyDTO } from './dto/create.company.dto';
import { FindAllDTO } from './dto/find.all.dto';

@Controller('company')
export class CompanyController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findAll(@Query() q: FindAllDTO) {
    const searchModel = q.searchModel ? JSON.parse(q.searchModel) : undefined;
    const query = new FindAllQuery(searchModel, q.offset, q.limit);
    return await this.queryBus.execute(query);
  }

  @Post()
  async createCompany(@Body() b: CreateCompanyDTO) {
    const command = new CreateCompanyCommand(b);
    await this.commandBus.execute(command);
  }
}
