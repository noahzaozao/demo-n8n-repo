import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // 启用 CORS
  app.enableCors();

  // Swagger 文档配置
  const config = new DocumentBuilder()
    .setTitle('Demo N8N NestJS API')
    .setDescription('用于 n8n 集成的演示 NestJS 服务')
    .setVersion('1.0')
    .addTag('health', '健康检查相关接口')
    .addTag('webhook', 'Webhook 相关接口')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 服务已启动，运行在: http://localhost:${port}`);
  console.log(`📖 API 文档地址: http://localhost:${port}/api`);
}

bootstrap();
