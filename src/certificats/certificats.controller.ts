import { Controller } from '@nestjs/common';
import { CertificatsService } from './certificats.service';

@Controller('certificats')
export class CertificatsController {
  constructor(private readonly certificatsService: CertificatsService) {}
}
