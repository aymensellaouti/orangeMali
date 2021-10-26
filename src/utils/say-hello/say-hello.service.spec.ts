import { Test, TestingModule } from '@nestjs/testing';
import { SayHelloService } from './say-hello.service';

describe('SayHelloService', () => {
  let service: SayHelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SayHelloService],
    }).compile();

    service = module.get<SayHelloService>(SayHelloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
