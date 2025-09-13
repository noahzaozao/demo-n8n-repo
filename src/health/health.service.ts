import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    };
  }

  ready() {
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
      message: '服务已就绪，可以处理请求',
    };
  }

  live() {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
      message: '服务存活中',
    };
  }
}
