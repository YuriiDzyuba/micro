import { Test, TestingModule } from '@nestjs/testing';
import { AdminApiService } from './adminApi.service';

describe('AdminService', () => {
  let service: AdminApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminApiService],
    }).compile();

    service = module.get<AdminApiService>(AdminApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
