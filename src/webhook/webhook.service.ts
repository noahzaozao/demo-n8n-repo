import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  async processWebhook(
    body: any,
    headers: Record<string, string>,
    query: Record<string, string>
  ) {
    this.logger.log('收到通用 Webhook 请求');
    this.logger.debug('请求体:', JSON.stringify(body, null, 2));
    this.logger.debug('请求头:', JSON.stringify(headers, null, 2));
    this.logger.debug('查询参数:', JSON.stringify(query, null, 2));

    // 这里可以添加具体的业务逻辑
    const response = {
      success: true,
      message: 'Webhook 处理成功',
      timestamp: new Date().toISOString(),
      receivedData: {
        body,
        headers: this.sanitizeHeaders(headers),
        query,
      },
    };

    this.logger.log('Webhook 处理完成');
    return response;
  }

  async processWebhookById(
    id: string,
    body: any,
    headers: Record<string, string>,
    query: Record<string, string>
  ) {
    this.logger.log(`收到 ID 为 ${id} 的 Webhook 请求`);
    
    const response = {
      success: true,
      message: `ID ${id} 的 Webhook 处理成功`,
      timestamp: new Date().toISOString(),
      webhookId: id,
      receivedData: {
        body,
        headers: this.sanitizeHeaders(headers),
        query,
      },
    };

    return response;
  }

  async processN8nWebhook(
    body: any,
    headers: Record<string, string>,
    query: Record<string, string>
  ) {
    this.logger.log('收到 n8n Webhook 请求');
    
    // 验证 n8n 签名（如果需要）
    const signature = headers['x-n8n-signature'];
    if (signature) {
      this.logger.log(`n8n 签名验证: ${signature}`);
    }

    const response = {
      success: true,
      message: 'n8n Webhook 处理成功',
      timestamp: new Date().toISOString(),
      source: 'n8n',
      receivedData: {
        body,
        headers: this.sanitizeHeaders(headers),
        query,
      },
    };

    return response;
  }

  testWebhook() {
    return {
      success: true,
      message: 'Webhook 测试端点正常',
      timestamp: new Date().toISOString(),
      endpoints: {
        general: 'POST /webhook',
        byId: 'POST /webhook/:id',
        n8n: 'POST /webhook/n8n',
        test: 'GET /webhook/test',
      },
    };
  }

  private sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
    // 移除敏感信息
    const sanitized = { ...headers };
    delete sanitized['authorization'];
    delete sanitized['cookie'];
    delete sanitized['x-api-key'];
    return sanitized;
  }
}
