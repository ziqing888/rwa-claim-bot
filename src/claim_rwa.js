import { ethers } from "ethers";
import dotenv from "dotenv";
import chalk from "chalk";

// 加载环境变量配置
dotenv.config();

// 检查是否配置了私钥
if (!process.env.PRIVATE_KEY) {
  console.error(chalk.red("🚨 缺少必需的环境变量: PRIVATE_KEY\n请在 .env 文件中配置您的私钥！"));
  process.exit(1);
}

// 初始化区块链连接和配置信息
const provider = new ethers.JsonRpcProvider("https://base-sepolia-rpc.publicnode.com");
const privateKeys = process.env.PRIVATE_KEY.split(',').map(key => key.trim());
const gasPrice = ethers.parseUnits('5', 'gwei');  // 自定义 gas 价格

// RWA 合约地址及 ABI
const contractAddress = "0x219BA210Ef31613390df886763099D0eD35aa6B8";
const abi = [
  {
    inputs: [],
    name: "claimTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// 领取 RWA 的核心逻辑
export async function claimRWA(wallet) {
  if (!wallet) {
    console.error(chalk.red("❌ 钱包对象未定义，请检查钱包的创建过程。"));
    return;
  }

  const address = wallet.address;
  
  if (!address) {
    console.error(chalk.red("❌ 钱包地址未定义，请检查钱包的创建过程。"));
    return;
  }

  console.log(chalk.cyanBright(`\n📬 正在处理钱包地址: ${address}`));

  try {
    console.log(chalk.yellowBright("📤 正在发送领取 RWA 请求..."));
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const tx = await contract.claimTokens({ gasPrice });
    
    console.log(chalk.greenBright("✅ 领取成功！"));
    console.log(`🔗 查看交易详情: ${chalk.blueBright(`https://sepolia.basescan.org/tx/${tx.hash}`)}`);
  } catch (error) {
    if (error.message.includes("Claim available only once per hour")) {
      console.warn(chalk.bgYellowBright.black("⏳ 您已经领取过 RWA，请等待下一小时后重试。"));
    } else {
      console.error(chalk.bgRedBright.black("❌ 领取失败:"), error.message);
    }
  }
}
