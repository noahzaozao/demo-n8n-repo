import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [HealthModule, WebhookModule],
})
export class AppModule {}
