import inquirer from "inquirer";
import { claimRWA } from "./claim_rwa.js";
import { mintUSDC } from "./mint_usdc.js";
import chalk from "chalk";

// 执行用户选择的操作
export async function executeAction(action) {
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
    const wallet = ...; // 这里需要确保 wallet 对象已被正确创建

    if (action === "claim") {
      await claimRWA(wallet);
    } else if (action === "mint") {
      await mintUSDC(wallet);
    }
    console.log(chalk.greenBright("✅ 操作成功完成！"));
  } catch (error) {
    console.error(chalk.red("❌ 操作过程中发生错误:"), error.message);
  }
}
