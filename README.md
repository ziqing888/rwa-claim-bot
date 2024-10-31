

TRWA 启动板机器人


TRWA 机器人是一款功能强大的工具，可帮助您自动执行 TRWA 测试网空投任务。

目录

TRWA 启动板机器人

前置条件
Git
Node JS (v22)
Base Sepolia ETH 余额



机器人功能
多账户支持
支持私钥和助记词
自动领取 TRWA 水龙头
自动领取 USDC 水龙头
自动质押
TRWA 测试网激励
#新的激励测试网：RWA 启动板 网络：Base Sepolia

Mint TRWA
➡️ 前往此处: https://sepolia.basescan.org/address/0x219BA210Ef31613390df886763099D0eD35aa6B8#writeContract

连接新的 Metamask
点击 Claim Token
Mint USDC
➡️ 前往此处: https://base-sepolia.blockscout.com/address/0x6Ac3aB54Dc5019A2e57eCcb214337FF5bbD52897?tab=write_contract

连接新的 Metamask
点击 Mint
输入您的地址
输入 1000000000 以 mint USDC
完成
➡️ 前往 : https://launch.rwa.inc/ ➖ 连接 ➖ 点击账户设置 ➖ 点击质押 RWA ➖ 输入 50% - 70% RWA ➖ 返回账户设置 ➖ 完成 KYC，约需 5 分钟 ➖ 完成

📌 您可以每日领取 RWA 代币并质押以获得更高的等级 📌 RWA 是首个利用最新 web3 技术将资产分割并上链的生态系统 : https://x.com/RWA_Inc_/status/1846189771795710099 📌 如何获得 Base Sepolia ETH？

测试网桥接工具：
https://rinkeby.orbiter.finance/?source=Sepolia&dest=Base%20Sepolia&token=ETH
https://superbridge.app/base-sepolia
完成

## 使用步骤 🚀

1. 克隆仓库：
```bash
git clone https://github.com/ziqing888/trwa-launchpad-bot
.git && cd rwa-claim-bot


```
 

2.运行

 ```bash
 npm install && npm run setup

```
3.配置您的账户
   ```bash
 nano accounts/accounts.js

 ```
4.配置机器人的基本设置
，使用 nano 编辑器
```bash
nano config/config.js

```
配置代理


```bash
nano config/proxy_list.js
 ```
按 CTRL + O 保存更改，然后按 ENTER 确认。接着按 CTRL + X 退出编辑器。

运行机器人：
 ```bash
  npm run start

 ```
Windows
打开 命令提示符 或 Power Shell。
克隆项目仓库
```bash
git clone https://github.com/ziqing888/rwa-claim-bot.git && cd rwa-claim-bot
```
运行
```bash
npm install && npm run setup
```
npm install && npm run setup
进入 rwa-claim-bot 目录。
打开 accounts 文件夹并将 accounts_tmp.js 重命名为 accounts.js。
打开 accounts.js 并设置您的账户。
进入 config 文件夹并配置 config.js。
如果需要使用代理，打开并配置 proxy_list.js。（若有 5 个账户，建议配置代理）
返回 rwa-claim-bot 目录。
在 命令提示符 或 Power Shell 中启动机器人。
运行机器人

重要说明（务必阅读）
务必使用新钱包运行该机器人，我不对任何资产损失负责。

该机器人代码未加密，可以用于学习如何与 EVM 智能合约交互，因此当有新的测试网或空投时，您可以基于此模板开发，但请注明出处。


感谢您的使用！如有问题，请在电报频道联系：https://t.me/ksqxszq
 
