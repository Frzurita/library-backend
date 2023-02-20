import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from '../../contexts/health_heck/application/app.service';

@ApiTags('Healthcheck')
@Controller('/health')
export class HealthCheckController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): void {
    return this.appService.healthCheck();
  }
}
