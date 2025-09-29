# Email Backend Service

这是一个功能完善的 Express 服务器，用于处理来自 portfolio 网站的邮件发送请求。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `env.example` 文件为 `.env`：

```bash
cp env.example .env
```

编辑 `.env` 文件，填入你的 Gmail 信息：

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3001
```

### 3. Gmail App Password 设置

1. 登录你的 Gmail 账户
2. 进入 [Google Account 设置](https://myaccount.google.com/)
3. 选择 "Security" -> "2-Step Verification"
4. 在底部找到 "App passwords"
5. 生成一个新的 App Password 用于这个应用
6. 将生成的密码填入 `.env` 文件的 `EMAIL_PASS` 字段

### 4. 测试邮件配置

```bash
npm run test-email
```

### 5. 启动服务器

```bash
# 生产环境
npm start

# 开发环境（自动重启）
npm run dev
```

服务器将在 `http://localhost:3001` 启动。

## 🔧 功能特性

- ✅ **输入验证**: 使用 express-validator 进行严格的输入验证
- ✅ **速率限制**: 防止垃圾邮件，每 15 分钟最多 5 次请求
- ✅ **安全防护**: 使用 helmet 进行安全头设置
- ✅ **CORS 配置**: 只允许特定域名访问
- ✅ **错误处理**: 完善的错误处理和日志记录
- ✅ **邮件模板**: 美观的 HTML 邮件模板
- ✅ **健康检查**: 服务器状态监控端点

## 📡 API 端点

### POST /api/send-email

发送邮件

**请求体：**

```json
{
  "name": "发送者姓名",
  "email": "发送者邮箱",
  "subject": "邮件主题",
  "message": "邮件内容"
}
```

**响应：**

```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**验证规则：**

- `name`: 2-100 字符，只能包含字母和空格
- `email`: 必须是有效的邮箱地址
- `subject`: 5-200 字符
- `message`: 10-2000 字符

### GET /api/health

健康检查端点

**响应：**

```json
{
  "status": "OK",
  "message": "Email service is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### GET /api/test-email-config

测试邮件配置

**响应：**

```json
{
  "success": true,
  "message": "Email configuration is valid",
  "service": "Gmail",
  "user": "Configured"
}
```

## 🛡️ 安全特性

- **速率限制**: 每 IP 每 15 分钟最多 5 次邮件请求
- **输入验证**: 严格验证所有输入字段
- **XSS 防护**: 自动转义 HTML 内容
- **CORS**: 只允许特定域名访问
- **安全头**: 使用 helmet 设置安全 HTTP 头

## 📝 日志记录

服务器会记录以下信息：

- 成功的邮件发送（包含时间戳和消息 ID）
- 失败的邮件发送（包含错误详情和 IP 地址）
- 验证失败（包含具体错误信息）

## 🔧 开发脚本

```bash
# 启动开发服务器（自动重启）
npm run dev

# 启动生产服务器
npm start

# 测试邮件配置
npm run test-email
```

## ⚠️ 注意事项

- 确保 Gmail 账户已启用 2-Step Verification
- 使用 App Password 而不是普通密码
- 邮件会发送到 `maxiaoma833@gmail.com`
- 发送者邮箱会设置为回复地址
- 生产环境建议使用 PM2 等进程管理器

## 🐛 故障排除

### 常见错误

1. **"Invalid login"**

   - 检查是否使用了 App Password
   - 确认 2-Step Verification 已启用

2. **"Too many requests"**

   - 速率限制触发，等待 15 分钟后重试

3. **"Validation failed"**
   - 检查输入字段是否符合要求
   - 查看具体验证错误信息

### 调试步骤

1. 运行 `npm run test-email` 检查配置
2. 访问 `/api/health` 检查服务器状态
3. 访问 `/api/test-email-config` 检查邮件配置
4. 查看服务器日志获取详细错误信息
