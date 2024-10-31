import bip39 from "bip39";
import moment from "moment-timezone";
import { ethers } from "ethers";
import { Config } from "../../config/config.js";
import { Twist } from "./twist.js";
import { Bless } from "./bless.js";
import { RPC } from "../core/network/rpc.js";

export class Helper {
  static display = Config.DISPLAY;
  static twist = this.display == "TWIST" ? new Twist() : new Bless();
  static spinnerContent = (data) => `
地址                   : ${data.address}
余额                   : ${data.eth} ${RPC.SYMBOL}
                        ${data.trwa} TRWA
                        ${data.usdc} USDC
今日 (TRWA|USDC|质押)   : ${data.todayTrwa}x | ${data.todayUsdc}x | ${data.todayStake}x

状态 : ${data.msg}
延迟 : ${data.delay}
`;

  // 延迟方法
  static delay = (ms, acc, msg, obj) => {
    return new Promise(async (resolve) => {
      let remainingMilliseconds = ms;

      if (acc != undefined) {
        await this.twist.log(
          msg,
          acc,
          obj,
          `延迟中 ${this.msToTime(ms)}`
        );
      } else {
        await this.twist.info(`延迟中 ${this.msToTime(ms)}`);
      }

      const interval = setInterval(async () => {
        remainingMilliseconds -= 1000;
        if (acc != undefined) {
          await this.twist.log(
            msg,
            acc,
            obj,
            `延迟中 ${this.msToTime(remainingMilliseconds)}`
          );
        } else {
          await this.twist.info(
            `延迟中 ${this.msToTime(remainingMilliseconds)}`
          );
        }

        if (remainingMilliseconds <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);

      setTimeout(async () => {
        clearInterval(interval);

        await this.twist.clearInfo();

        if (acc) {
          await this.twist.log(msg, acc, obj);
        }
        resolve();
      }, ms);
    });
  };

  // 随机生成用户代理
  static randomUserAgent() {
    const list_useragent = [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15",
      "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104",
      "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104",
      "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374",
      "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374",
    ];
    return list_useragent[Math.floor(Math.random() * list_useragent.length)];
  }

  // 格式化时间戳
  static readTime(milliseconds) {
    const date = moment.unix(milliseconds);
    return date.format("YYYY-MM-DD HH:mm:ss");
  }

  // 获取当前时间戳（新加坡时区）
  static getCurrentTimestamp() {
    const timestamp = moment().tz("Asia/Singapore").unix();
    return timestamp.toString();
  }

  // 生成随机整数
  static random(min, max) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand;
  }

  // 生成随机浮点数
  static randomFloat(min, max, fixed = 4) {
    const rand = Math.random() * (max - min) + min;
    return parseFloat(rand.toFixed(fixed));
  }

  // 将毫秒转化为时间格式
  static msToTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const remainingMillisecondsAfterHours = milliseconds % (1000 * 60 * 60);
    const minutes = Math.floor(remainingMillisecondsAfterHours / (1000 * 60));
    const remainingMillisecondsAfterMinutes =
      remainingMillisecondsAfterHours % (1000 * 60);
    const seconds = Math.round(remainingMillisecondsAfterMinutes / 1000);

    return `${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;
  }

  // 生成随机字符串
  static generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // 序列化 BigInt 类型数据
  static serializeBigInt = (obj) => {
    return JSON.parse(
      JSON.stringify(obj, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  };

  // 验证是否是助记词
  static isMnemonic(input) {
    return bip39.validateMnemonic(input);
  }

  // 验证是否是私钥
  static isPrivateKey(input) {
    const data = input.replace(/^0x/, "");
    const regex = /^[a-fA-F0-9]{64}$/;
    return regex.test(data);
  }

  // 判断输入类型（助记词或私钥）
  static determineType(input) {
    if (this.isMnemonic(input)) {
      return "助记词";
    } else if (this.isPrivateKey(input)) {
      return "私钥";
    } else {
      return "未知";
    }
  }

  // 生成随机 nonce
  static generateNonce() {
    return ethers.hexlify(ethers.randomBytes(16));
  }

  // 判断日期是否为今天
  static isToday(date) {
    const lastCheckInDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastCheckInDateOnly = new Date(lastCheckInDate);
    lastCheckInDateOnly.setHours(0, 0, 0, 0);
    return lastCheckInDateOnly.getTime() === today.getTime();
  }

  // 根据选择器查找函数
  static findFunctionBySelector(targetSelector, ABIs) {
    for (const abi of ABIs) {
      for (const item of abi) {
        if (item.type === "function") {
          const functionSignature = `${item.name}(${item.inputs
            .map((input) => input.type)
            .join(",")})`;
          const selector =
            "0x" +
            ethers.keccak256(ethers.toUtf8Bytes(functionSignature)).slice(0, 8);

          // 检查计算出的选择器是否匹配目标选择器
          if (selector.includes(targetSelector)) {
            console.log(`找到的函数: ${functionSignature}`);
            return functionSignature;
          }
        }
      }
    }
    console.log("未找到函数");
    return null;
  }
}
