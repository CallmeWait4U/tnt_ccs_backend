import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './app.service';
import { createCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
//import { Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  @Post()
  async create(@Body() createCatDto: createCatDto) {
    this.catService.create(createCatDto);
  }
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cat> {
    return this.catService.findOne(id);
  }
}
