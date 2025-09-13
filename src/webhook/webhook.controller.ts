import { 
  Controller, 
  Post, 
  Body, 
  Headers, 
  Query, 
  Get,
  Param,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { WebhookService } from './webhook.service';
import { WebhookDto } from './dto/webhook.dto';

@ApiTags('webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '接收通用 Webhook' })
  @ApiBody({ type: WebhookDto })
  @ApiResponse({ status: 200, description: 'Webhook 接收成功' })
  async receiveWebhook(
    @Body() body: any,
    @Headers() headers: Record<string, string>,
    @Query() query: Record<string, string>
  ) {
    return this.webhookService.processWebhook(body, headers, query);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '接收指定 ID 的 Webhook' })
  @ApiBody({ type: WebhookDto })
  @ApiResponse({ status: 200, description: 'Webhook 接收成功' })
  async receiveWebhookById(
    @Param('id') id: string,
    @Body() body: any,
    @Headers() headers: Record<string, string>,
    @Query() query: Record<string, string>
  ) {
    return this.webhookService.processWebhookById(id, body, headers, query);
  }

  @Get('test')
  @ApiOperation({ summary: '测试 Webhook 端点' })
  @ApiResponse({ status: 200, description: '测试成功' })
  testWebhook() {
    return this.webhookService.testWebhook();
  }

  @Post('n8n')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'n8n 专用 Webhook 端点' })
  @ApiBody({ type: WebhookDto })
  @ApiHeader({ name: 'X-N8N-Signature', required: false, description: 'n8n 签名' })
  @ApiResponse({ status: 200, description: 'n8n Webhook 接收成功' })
  async receiveN8nWebhook(
    @Body() body: any,
    @Headers() headers: Record<string, string>,
    @Query() query: Record<string, string>
  ) {
    return this.webhookService.processN8nWebhook(body, headers, query);
  }
}
