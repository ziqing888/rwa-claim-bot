import inquirer from "inquirer";
import { displayHeader } from "./src/header.js";
import { executeAction } from "./src/actionHandler.js";
import { ethers } from "ethers"; // 导入 ethers
import dotenv from "dotenv"; // 导入 dotenv
import chalk from "chalk"; // 导入 chalk

// 加载环境变量
dotenv.config();

// 主程序入口
async function main() {
  displayHeader(); // 显示程序头部信息

  // 检查是否配置了私钥
  if (!process.env.PRIVATE_KEY) {
    console.error(chalk.red("🚨 缺少必需的环境变量: PRIVATE_KEY\n请在 .env 文件中配置您的私钥！"));
    return;
  }

  // 初始化区块链提供者
  const provider = new ethers.JsonRpcProvider("https://base-sepolia-rpc.publicnode.com");
  const privateKeys = process.env.PRIVATE_KEY.split(',').map(key => key.trim());

  // 提示用户选择操作
  const actions = [
    { name: "🎉 领取 -RWA  ", value: "claim" },
    { name: "💸 铸造 -USDC  ", value: "mint" }
  ];

  // 用户选择操作
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: chalk.cyan("请选择一个操作："),
      choices: actions,
    },
  ]);

  // 创建钱包并传递给操作处理函数
  for (const privateKey of privateKeys) {
    const wallet = new ethers.Wallet(privateKey.trim(), provider);
    await executeAction(action, wallet); // 传递 wallet 对象
  }
}

// 启动主程序
main().catch(error => {
  console.error(chalk.red("\n❌ 发生错误:", error));
});
