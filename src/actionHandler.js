import inquirer from "inquirer";
import { claimRWA } from "./claim_rwa.js";  // 确保导入路径正确
import { mintUSDC } from "./mint_usdc.js";   // 确保导入路径正确
import chalk from "chalk";

// 执行用户选择的操作
export async function executeAction(action) {
  console.log(chalk.magentaBright(`\n🚀 您选择的操作: ${action === "claim" ? "领取 RWA" : "铸造 USDC"}`));
  
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `您确认要执行 ${action === "claim" ? "领取 RWA" : "铸造 USDC"} 操作吗？`,
    },
  ]);

  if (!confirm) {
    console.log(chalk.yellow("🚫 操作已取消。"));
    return;
  }

  console.log(chalk.cyanBright("🔄 正在执行操作，请稍候...\n"));

  // 根据用户选择的操作调用相应的功能
  try {
    if (action === "claim") {
      await claimRWA();  // 调用领取 RWA 的函数
    } else if (action === "mint") {
      await mintUSDC();  // 调用铸造 USDC 的函数
    }
    console.log(chalk.greenBright("✅ 操作成功完成！"));
  } catch (error) {
    console.error(chalk.red("❌ 操作过程中发生错误:"), error.message);
  }
}


