# Demo N8N NestJS 服务

这是一个专为 n8n 集成设计的 NestJS 演示服务，提供了健康检查和 Webhook 功能。

## 功能特性

- 🏥 **健康检查**: 提供 `/health`、`/health/ready`、`/health/live` 端点
- 🔗 **Webhook 接收**: 支持通用和 n8n 专用的 Webhook 端点
- 📖 **API 文档**: 集成 Swagger 文档，访问 `/api` 查看
- 🛡️ **数据验证**: 使用 class-validator 进行请求验证
- 🚀 **CORS 支持**: 已启用跨域资源共享

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run start:dev
```

服务将在 `http://localhost:3000` 启动。

### 生产模式运行

```bash
# 构建项目
npm run build

# 启动生产服务
npm run start:prod
```

## API 端点

### 健康检查

- `GET /health` - 完整健康检查
- `GET /health/ready` - 就绪检查
- `GET /health/live` - 存活检查

### Webhook 端点

- `POST /webhook` - 通用 Webhook 接收
- `POST /webhook/:id` - 指定 ID 的 Webhook 接收
- `POST /webhook/n8n` - n8n 专用 Webhook 端点
- `GET /webhook/test` - Webhook 测试端点

### API 文档

访问 `http://localhost:3000/api` 查看完整的 Swagger API 文档。

## n8n 集成示例

### 1. HTTP Request 节点配置

在 n8n 中使用 HTTP Request 节点向此服务发送数据：

```json
{
  "url": "http://localhost:3000/webhook/n8n",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "X-N8N-Signature": "your-signature-here"
  },
  "body": {
    "event": "workflow.completed",
    "data": {
      "workflowId": "123",
      "executionId": "456",
      "status": "success"
    }
  }
}
```

### 2. Webhook 节点配置

在 n8n 中配置 Webhook 节点来接收此服务的数据：

- **Webhook URL**: `http://localhost:3000/webhook`
- **HTTP Method**: POST
- **Response Mode**: Response Code

## 环境变量

- `PORT`: 服务端口号（默认: 3000）
- `NODE_ENV`: 运行环境（development/production）

## 开发脚本

- `npm run build` - 构建项目
- `npm run start:dev` - 开发模式启动
- `npm run start:debug` - 调试模式启动
- `npm run start:prod` - 生产模式启动
- `npm run lint` - 代码检查
- `npm run format` - 代码格式化
- `npm run test` - 运行测试
- `npm run test:e2e` - 运行端到端测试

## 项目结构

```
src/
├── health/           # 健康检查模块
│   ├── health.controller.ts
│   ├── health.service.ts
│   └── health.module.ts
├── webhook/          # Webhook 模块
│   ├── dto/
│   │   └── webhook.dto.ts
│   ├── webhook.controller.ts
│   ├── webhook.service.ts
│   └── webhook.module.ts
├── app.module.ts     # 主模块
└── main.ts          # 应用入口
```

## 技术栈

- **NestJS**: Node.js 框架
- **TypeScript**: 类型安全的 JavaScript
- **Swagger**: API 文档生成
- **class-validator**: 数据验证
- **Jest**: 测试框架

## 许可证

MIT License
