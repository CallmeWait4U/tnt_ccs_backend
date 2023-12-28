import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './app.controller';
import { CatsService } from './app.service';

describe('CatController', () => {
  let catController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catController = app.get<CatsController>(CatsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(catController.findAll()).toBe('Hello World!');
    });
  });
});
