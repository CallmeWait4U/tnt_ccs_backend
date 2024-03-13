import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestDTO } from './test.dto';
import { TestService } from './test.service';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get('mockData')
  mockData(@Query() q: TestDTO) {
    return this.testService.mockData(q.numCus);
  }
}
