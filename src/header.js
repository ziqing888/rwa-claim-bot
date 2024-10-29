import chalk from 'chalk';

export function displayHeader() {
  process.stdout.write('\x1Bc'); // 清屏

  // 打印标题
  console.log(chalk.cyan('========================================'));
  console.log(chalk.bold(chalk.cyan('🌟        RWA 自动领取机器人         🌟')));
  console.log(chalk.bold(chalk.green('           创建者: 子清              ')));
  console.log(chalk.magenta('🌐  电报频道: https://t.me/ksqxszq   '));
  console.log(chalk.cyan('========================================'));

  // 显示当前时间
  console.log(chalk.yellow(`当前时间: ${new Date().toLocaleString()}`));

  // 添加分隔线
  console.log(chalk.magenta("=================================================="));
}

