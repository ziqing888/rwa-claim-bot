import inquirer from "inquirer";
import { claimTokens } from "./claim_tokens.js";
import { mintTokens } from "./mint_tokens.js";

export async function executeAction(action) {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `您确认要执行${action === "claim" ? "领取奖励 Token" : "铸造新 Token"}操作吗？`,
    },
  ]);

  if (!confirm) {
    console.log("🚫 操作已取消。");
    return;
  }

  console.log(chalk.blue("\n🚀 正在执行操作...\n"));

  if (action === "claim") {
    await claimTokens();
  } else if (action === "mint") {
    await mintTokens();
  }
}
