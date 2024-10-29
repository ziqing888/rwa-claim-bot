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

// USDC 合约地址及 ABI
const contractAddress = "0x6Ac3aB54Dc5019A2e57eCcb214337FF5bbD52897";
const abi = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// 铸造 USDC 的核心逻辑
export async function mintUSDC(wallet) {
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const address = wallet.address;
  const mintAmount = ethers.parseUnits("1000", 6);  // 铸造金额设为 1000 USDC

  console.log(chalk.cyanBright(`\n🏦 开始处理钱包地址: ${address}`));
  console.log(chalk.yellow("—————————————————————————"));

  try {
    console.log(chalk.yellowBright("📤 正在发送铸造 USDC 的请求..."));
    const tx = await contract.mint(address, mintAmount, { gasPrice });

    console.log(chalk.greenBright("✅ 铸造成功！"));
    console.log(`🔗 查看交易详情: ${chalk.blueBright(`https://sepolia.basescan.org/tx/${tx.hash}`)}`);
  } catch (error) {
    if (error.message.includes("insufficient funds")) {
      console.warn(chalk.bgYellowBright.black("💸 钱包余额不足，无法支付铸造 USDC 的费用。"));
    } else {
      console.error(chalk.bgRedBright.black("❌ 交易失败:"), error.message);
    }
  }
  console.log(chalk.yellow("—————————————————————————"));
}

