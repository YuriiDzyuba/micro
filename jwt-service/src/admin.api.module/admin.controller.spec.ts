import { Test, TestingModule } from '@nestjs/testing';
import { AdminApiController } from './adminApi.controller';
import { AdminApiService } from './adminApi.service';

describe('AdminController', () => {
  let controller: AdminApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminApiController],
      providers: [AdminApiService],
    }).compile();

    controller = module.get<AdminApiController>(AdminApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
