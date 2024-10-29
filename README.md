# RWA 自动领取机器人 🎉

欢迎使用 RWA Claim Bot！本机器人帮助您每 65 分钟自动领取奖励 Token，或轻松铸造新 Token。

## 功能 🌟

- **自动领取奖励**：按设定的间隔领取奖励 Token。
- **铸造新 Token**：可快速铸造新的 Token。
- **多钱包支持**：轻松管理多个钱包。

## 环境要求 🔧

- **Node.js**
- **NPM**

## 使用步骤 🚀

1. **克隆仓库：**
   ```bash
   git clone https://github.com/ziqing888/rwa-claim-bot.git
2.进入项目目录：

 ```bash
  cd rwa-claim-bot
```
3.安装依赖：
   ```bash
  npm install
 ```
4.配置 .env 文件：
```bash
PRIVATE_KEY=你的私钥1,你的私钥2
 ```
运行机器人：
 ```bash
  node index.js
 ```
常见问题 ❓
如果启动时提示缺少 PRIVATE_KEY 环境变量，请检查 .env 文件格式并确保私钥配置正确。

感谢您的使用！如有问题，请在电报频道联系：https://t.me/ksqxszq
 ```bash

#### 4. `package.json`

```json
{
  "name": "rwa-claim-bot",
  "version": "1.0.0",
  "description": "自动领取和铸造 Token 的机器人",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "inquirer": "^8.2.0",
    "ethers": "^6.0.0",
    "chalk": "^5.0.0",
    "dotenv": "^10.0.0"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/ziqing888/rwa-claim-bot.git"
  },
  "keywords": [
    "Token",
    "Claim",
    "Bot",
    "Automation"
  ],
  "author": "子清"
}
```
