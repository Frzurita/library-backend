import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../../../src/contexts/health_heck/application/app.service';

describe('HealthCheck Service', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('healthCheck', () => {
    it('should return "undefined"', async () => {
      expect(await appService.healthCheck()).toBe(undefined);
    });
  });
});
