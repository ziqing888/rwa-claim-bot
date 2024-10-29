import inquirer from "inquirer";
import { displayHeader } from "./src/header.js";
import { executeAction } from "./src/actionHandler.js";

// 主程序入口
async function main() {
  displayHeader();

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

  await executeAction(action);
}

// 启动主程序
main().catch(error => {
  console.error(chalk.red("\n❌ 发生错误:", error));
});

