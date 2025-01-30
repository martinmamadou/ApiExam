import { Test, TestingModule } from '@nestjs/testing';
import { CertificatsService } from './certificats.service';

describe('CertificatsService', () => {
  let service: CertificatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificatsService],
    }).compile();

    service = module.get<CertificatsService>(CertificatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
