# Changelog

## [1.1.0] - 2024-01-XX

### Added
- 新增 GitHub Webhook 支持
- 添加 `POST /webhook/github` 端点用于接收 GitHub 事件
- 支持 GitHub 事件类型识别和签名验证
- 更新 API 文档以包含新的 GitHub webhook 端点

### Changed
- 更新 README.md 添加 GitHub 集成功能描述
- 更新版本号至 1.1.0

### Technical Details
- 在 `WebhookController` 中新增 `receiveGitHubWebhook` 方法
- 在 `WebhookService` 中新增 `processGitHubWebhook` 方法
- 支持 `X-GitHub-Event` 和 `X-Hub-Signature-256` 头部验证
