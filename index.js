import inquirer from "inquirer";
import chalk from "chalk";
import { displayHeader } from "./src/header.js"; // 确保路径正确
import { executeAction } from "./src/actionHandler.js"; // 确保路径正确

async function main() {
  displayHeader(); // 显示项目标题和 Logo

  console.log(chalk.cyan.bold("\n🌟 欢迎来到 RWA Claim Bot 🌟"));
  console.log(chalk.magenta("请选择一个操作开始：\n"));

  const actions = [
    { name: "领取 RWA 🏆", value: "claim" },
    { name: "铸造 USDC 🏗️", value: "mint" }
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "请选择一个操作：",
      choices: actions,
    },
  ]);

  console.log(chalk.cyan("\n💡 正在准备执行您的选择，请稍候...\n"));
  await executeAction(action);
  console.log(chalk.green.bold("\n✅ 操作已成功完成！"));
}

// 启动主程序
main().catch(error => {
  console.error(chalk.red("\n❌ 发生错误:", error));
});
