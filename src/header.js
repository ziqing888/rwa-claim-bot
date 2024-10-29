import chalk from "chalk";
import { exec } from "child_process";

export function displayHeader() {
  exec('curl -s https://raw.githubusercontent.com/ziqing888/logo.sh/refs/heads/main/logo.sh | bash', (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red("❌ 无法加载 Logo:"), stderr);
    } else {
      console.log(stdout);
      console.log(chalk.white.bold("\n🎉 欢迎使用 RWA Claim Bot 🎉"));
      console.log(chalk.gray("项目出处: 子清"));
      console.log(chalk.gray("电报频道: https://t.me/ksqxszq"));
      console.log(chalk.yellow("\n请仔细阅读每个步骤的提示，以获得更好的操作体验！"));
      console.log(chalk.magenta("==================================================\n"));
    }
  });
}
