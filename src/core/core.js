import { ethers } from "ethers";
import { Helper } from "../utils/helper.js";
import { API } from "./api/api.js";
import { RPC } from "./network/rpc.js";
import logger from "../utils/logger.js";
import { Config } from "../../config/config.js";
import { TRWAFAUCET } from "./contract/trwa_faucet.js";
import { TRWA } from "./contract/trwa.js";
import sqlite from "./db/sqlite.js";
import { USDC } from "./contract/usdc.js";
import { POOLPROXY } from "./contract/pool_proxy.js";
import { STAKINGPOOL } from "./contract/staking_pool.js";

export default class Core extends API {
  constructor(acc, proxy) {
    super("https://api.launch.rwa.inc", proxy);
    this.acc = acc;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);

    this.trwaFaucet = new ethers.Contract(
      TRWAFAUCET.CA,
      TRWAFAUCET.ABI,
      this.wallet
    );
    this.usdc = new ethers.Contract(USDC.CA, USDC.ABI, this.provider);
    this.trwa = new ethers.Contract(TRWA.CA, TRWA.ABI, this.provider);

    this.targetPool = ["0xB4D0040133EB541e80DE9564C9392cb43dBFce13"];
    this.proxyPool1 = new ethers.Contract(
      POOLPROXY.CA,
      POOLPROXY.ABI,
      this.provider
    );
    this.pool1 = new ethers.Contract(
      STAKINGPOOL.CA,
      STAKINGPOOL.ABI,
      this.provider
    );
  }

  // 连接钱包
  async connectWallet() {
    try {
      if (!this.acc) {
        throw new Error("请设置钱包私钥");
      }
      const data = this.acc;
      await Helper.delay(500, this.acc, `正在连接到钱包账户`, this);
      const type = Helper.determineType(data);
      logger.info(`账户类型 : ${type}`);
      if (type == "Secret Phrase") {
        /**
         * @type {Wallet}
         */
        this.wallet = ethers.Wallet.fromPhrase(data, this.provider);
      } else if (type == "Private Key") {
        /**
         * @type {Wallet}
         */
        this.wallet = new ethers.Wallet(data.trim(), this.provider);
      } else {
        throw Error("无效的账户助记词或私钥");
      }
      this.address = this.wallet.address;
      await Helper.delay(500, this.acc, `钱包已连接`, this);
    } catch (error) {
      await this.handleError(error);
    }
  }

  // 获取余额
  async getBalance(update = false) {
    try {
      if (!update) {
        await Helper.delay(500, this.acc, `获取钱包余额`, this);
      }

      const ethBalance = ethers.formatEther(
        await this.provider.getBalance(this.wallet.address)
      );
      const trwaBalance = ethers.formatEther(
        await this.trwa.balanceOf(this.address)
      );
      const usdcBalance = ethers.formatUnits(
        await this.usdc.balanceOf(this.address),
        6
      );
      this.balance = {
        ETH: ethBalance,
        TRWA: trwaBalance,
        USDC: usdcBalance,
      };
      if (update) await Helper.delay(500, this.acc, `余额已更新`, this);
    } catch (error) {
      await this.handleError(error);
    }
  }

  // 领取 TRWA 代币
  async claimTrwa() {
    try {
      await Helper.delay(2000, this.acc, `尝试领取 TRWA 代币`, this);

      const data = await this.trwaFaucet.claimTokens.populateTransaction();
      const tx = await this.buildTxBody(data);
      await this.executeTx(tx);
      await sqlite.insertData(
        this.address,
        new Date().toISOString(),
        "claim TRWA"
      );
      await Helper.delay(
        2000,
        this.acc,
        `成功领取 TRWA Faucet`,
        this
      );
    } catch (error) {
      await Helper.delay(3000, this.acc, error.message, this);
    }
  }

  // 铸造 USDC 代币
  async mintUsdc() {
    try {
      await Helper.delay(2000, this.acc, `尝试铸造 USDC 代币`, this);

      const data = await this.usdc.mint.populateTransaction(
        this.address,
        1000000000
      );
      const tx = await this.buildTxBody(data);
      await this.executeTx(tx);
      await sqlite.insertData(
        this.address,
        new Date().toISOString(),
        "mint USDC"
      );
      await Helper.delay(2000, this.acc, `成功铸造 USDC`, this);
    } catch (error) {
      throw error;
    }
  }

  // 质押 TRWA 代币
  async stake(pool) {
    try {
      const approval = (await sqlite.getTxLog(this.address, "approve")).length;
      if (approval == 0) {
        const spender = pool.pool_address;
        await this.approveTokenSpend(TRWA.CA, TRWA.ABI, spender);
      }

      await Helper.delay(
        2000,
        this.acc,
        `尝试将 TRWA 代币质押到池 ${pool.pool_id} ${pool.title}`,
        this
      );
      const poolAddress = pool.pool_address;
      if (poolAddress == (await this.proxyPool1.getAddress())) {
        let data = await this.pool1.linearDeposit.populateTransaction(
          pool.pool_id,
          ethers.parseUnits(Config.TRWASTAKINGAMOUNT.toString(), 18)
        );
        data.to = await this.proxyPool1.getAddress();
        const tx = await this.buildTxBody(data);
        await this.executeTx(tx);

        await Helper.delay(
          3000,
          this.acc,
          `成功质押 ${Config.TRWASTAKINGAMOUNT} TRWA 到池 ${pool.pool_id} ${pool.title}`,
          this
        );
      } else {
        await Helper.delay(
          3000,
          this.acc,
          `此机器人不支持该池的质押`,
          this
        );
      }
      await sqlite.insertData(this.address, new Date().toISOString(), "stake");
    } catch (error) {
      await Helper.delay(3000, this.acc, error.message, this);
    }
  }

  // 连接到 RWA 应用
  async conectRwaDapps() {
    await Helper.delay(1000, this.acc, `正在连接到 RWA 应用`, this);
    const timestamp = Date.now();
    const msg = `Launchpad 用户签名`;
    logger.info(`签名信息: ${msg}`);
    const signedMessage = await this.wallet.signMessage(msg);
    logger.info(`已签名信息: ${signedMessage}`);
    this.signatureMessage = signedMessage;
    await Helper.delay(1000, this.acc, `已连接到 RWA 应用`, this);
  }

  // 获取质押池列表
  async getStakingPoolList() {
    try {
      await Helper.delay(1000, this.acc, `获取质押池列表`, this);
      const res = await this.fetch(`/staking-pool`, "GET");
      if (res.status == 200) {
        this.stakingPool = res.data;
        await Helper.delay(
          1000,
          this.acc,
          `成功获取质押池`,
          this
        );
      } else {
        throw res;
      }
    } catch (error) {
      await this.handleError(error);
    }
  }

  // 构建交易体
  async buildTxBody(data) {
    const amountInWei = ethers.parseEther("0");
    const nonce = await this.getOptimalNonce();
    const gasLimit = await this.estimateGasWithRetry(
      data.to,
      amountInWei,
      data.data,
      true
    );
    const tx = {
      to: data.to,
      gasLimit,
      gasPrice: ethers.parseUnits(Config.GWEIPRICE.toString(), "gwei"),
      nonce: nonce,
      data: data.data,
    };
    return tx;
  }

  // 授权代币支出
  async approveTokenSpend(ca, abi, spender) {
    await Helper.delay(
      2000,
      this.acc,
      `正在授权代币用于质押池支出`,
      this
    );
    const contractToApprove = new ethers.Contract(ca, abi, this.wallet);
    const tx = await contractToApprove.approve(spender, ethers.MaxUint256);
    await Helper.delay(2000, this.acc, `代币已授权`, this);
    const txRev = await tx.wait();
    logger.info(`交易确认并完成: ${JSON.stringify(txRev)}`);
    this.hash = txRev.hash;
    await Helper.delay(
      5000,
      this.acc,
      `授权交易执行 \n${RPC.EXPLORER}tx/${txRev.hash}`,
      this
    );
  }

  // 执行交易
  async executeTx(tx) {
    try {
      logger.info(`交易数据 ${JSON.stringify(Helper.serializeBigInt(tx))}`);
      await Helper.delay(500, this.acc, `执行交易中...`, this);
      const txRes = await this.wallet.sendTransaction(tx);
      if (Config.WAITFORBLOCKCONFIRMATION) {
        await Helper.delay(
          500,
          this.acc,
          `交易已执行，等待区块确认...`,
          this
        );
        const txRev = await txRes.wait();
        logger.info(`交易确认并完成: ${JSON.stringify(txRev)}`);
        this.hash = txRev.hash;
        await Helper.delay(
          5000,
          this.acc,
          `交易已执行 \n${RPC.EXPLORER}tx/${txRev.hash}`,
          this
        );
      } else {
        await Helper.delay(
          5000,
          this.acc,
          `交易已执行 \n${RPC.EXPLORER}tx/${txRes.hash}`,
          this
        );
      }
      await this.getBalance(true);
    } catch (error) {
      await this.handleError(error);
    }
  }

  // 获取最优 nonce
  async getOptimalNonce() {
    try {
      const latestNonce = await this.provider.getTransactionCount(
        this.wallet.address,
        "latest"
      );
      const pendingNonce = await this.provider.getTransactionCount(
        this.wallet.address,
        "pending"
      );
      const optimalNonce =
        pendingNonce > latestNonce ? pendingNonce : latestNonce;
      return optimalNonce;
    } catch (error) {
      await this.handleError(error);
    }
  }

  // 重试估算 gas
  async estimateGasWithRetry(
    address,
    amount,
    rawdata,
    directThrow = false,
    retries = 3,
    delay = 3000
  ) {
    let error;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        logger.info(`估算交易 ${rawdata} 的 Gas`);
        const gasLimit = await this.provider.estimateGas({
          from: this.wallet.address,
          to: address,
          value: amount,
          data: rawdata,
        });
        return gasLimit;
      } catch (err) {
        if (directThrow) throw Error(err.shortMessage);
        await Helper.delay(
          delay,
          this.acc,
          `${err.shortMessage}... 尝试 ${attempt + 1} 次中的第 ${retries} 次`,
          this
        );
        if (attempt === retries - 1) {
          throw Error(`尝试 ${retries} 次后估算 gas 失败。`);
        }
      }
    }
  }

  // 处理错误
  async handleError(error) {
    if (error.code) {
      if (error.code == 401) {
        throw Error(`错误 ${error.msg}`);
      } else {
        await Helper.delay(3000, this.acc, `错误 : ${error.msg}`, this);
      }
    } else {
      throw error;
    }
  }
}
