import { ethers } from "ethers";
import dotenv from "dotenv";
import chalk from "chalk";

// 加载环境变量配置
dotenv.config();

// 检查是否配置了私钥
if (!process.env.PRIVATE_KEY) {
  console.error(chalk.red("🚨 缺少必需的环境变量: PRIVATE_KEY。\n请在 .env 文件中配置您的私钥！"));
  process.exit(1);
}

// 初始化区块链连接
const provider = new ethers.JsonRpcProvider("https://base-sepolia-rpc.publicnode.com");

// 初始化钱包
export function initializeWallets() {
  const privateKeys = process.env.PRIVATE_KEY.split(',').map(key => key.trim());
  const wallets = privateKeys.map(pk => new ethers.Wallet(pk, provider));
  console.log(chalk.cyanBright(`\n🔑 初始化了 ${wallets.length} 个钱包...\n`));
  return wallets;
}

// 处理合约交易
export async function processTransaction(wallet, contractAddress, abi, functionName, args = []) {
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const address = wallet.address;

  console.log(chalk.green(`📦 正在处理钱包地址: ${address}`));
  try {
    console.log(chalk.yellow("🔄 正在发送交易请求..."));
    const tx = await contract[functionName](...args, {
      gasPrice: ethers.parseUnits('5', 'gwei'), // 使用默认 gas 价格
    });

    console.log(chalk.greenBright("✅ 交易成功发送！"));
    console.log(`🔗 查看交易详情: ${chalk.blueBright(`https://sepolia.basescan.org/tx/${tx.hash}`)}`);
  } catch (error) {
    if (error.message.includes("insufficient funds")) {
      console.error(chalk.bgYellowBright.black("💸 钱包余额不足，无法支付交易费用。"));
    } else {
      console.error(chalk.bgRedBright.black("❌ 交易失败:"), error.message);
    }
  }
}
