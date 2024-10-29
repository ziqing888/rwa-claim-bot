import { ethers } from "ethers"; 
import dotenv from "dotenv";
import chalk from "chalk";

// 加载环境变量
dotenv.config();

// 检查是否配置了私钥
if (!process.env.PRIVATE_KEY) {
  console.error(chalk.red("🚨 缺少必需的环境变量: PRIVATE_KEY\n请在 .env 文件中配置您的私钥！"));
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider("https://base-sepolia-rpc.publicnode.com");
const privateKeys = process.env.PRIVATE_KEY.split(',');
const gasPrice = ethers.parseUnits('5', 'gwei');

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

export async function mintUSDC(wallet) {
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const address = wallet.address;
  const mintAmount = ethers.parseUnits("1000000000", 6);
  console.log(chalk.green(`💰 Address: ${address}`));

  try {
    console.log(chalk.yellow("➡️  正在发送铸造 USDC 请求..."));
    const tx = await contract.mint(address, mintAmount, {
      gasPrice: gasPrice, 
    });

    console.log(chalk.blue("✅ 铸造请求已发送！"));
    console.log(`🔗 查看交易详情: ${chalk.cyan(`https://sepolia.basescan.org/tx/${tx.hash}`)}`);

  } catch (error) {
    if (error.message.includes("insufficient funds")) {
      console.warn(chalk.yellow("⏳ 余额不足，无法铸造 USDC。"));
    } else {
      console.error(chalk.red("❌ 铸造失败:"), error.message);
    }
  }
}

