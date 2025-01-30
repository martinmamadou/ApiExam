import { Test, TestingModule } from '@nestjs/testing';
import { CertificatsController } from './certificats.controller';
import { CertificatsService } from './certificats.service';

describe('CertificatsController', () => {
  let controller: CertificatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificatsController],
      providers: [CertificatsService],
    }).compile();

    controller = module.get<CertificatsController>(CertificatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
