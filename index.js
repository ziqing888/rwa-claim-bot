import { accountLists } from "./accounts/accounts.js";
import { Config } from "./config/config.js";
import { proxyList } from "./config/proxy_list.js";
import Core from "./src/core/core.js";
import sqlite from "./src/core/db/sqlite.js";
import { Helper } from "./src/utils/helper.js";
import logger from "./src/utils/logger.js";

async function 操作(acc, proxy) {
  const core = new Core(acc, proxy);
  try {
    await core.connectWallet();
    await core.getBalance();
    await core.conectRwaDapps();

    await core.claimTrwa();
    await core.mintUsdc();

    await core.getStakingPoolList();
    const targetPool = core.targetPool;
    for (const item of core.stakingPool.filter(
      (item) =>
        targetPool.includes(item.pool_address) && item.staking_type == "linear"
    )) {
      if (core.balance.TRWA < Config.TRWASTAKINGAMOUNT) {
        await Helper.delay(
          3000,
          acc,
          `当前 TRWA 数量为 ${core.balance.TRWA} TRWA，小于配置的质押数量 ${Config.TRWASTAKINGAMOUNT} TRWA`,
          core
        );
        break;
      }
      await core.stake(item);
    }

    const delay = 60000 * 60;
    const account = accountLists.find((item) => item == acc);
    const accIdx = accountLists.indexOf(account);
    await Helper.delay(
      delay,
      acc,
      `账户 ${accIdx + 1} 处理完成，延迟时间为 ${Helper.msToTime(delay)}`,
      core
    );
    await 操作(acc, proxy);
  } catch (error) {
    let account = acc;
    if (error.message) {
      await Helper.delay(
        10000,
        acc,
        `错误 : ${error.message}，10 秒后重试`,
        core
      );
    } else {
      await Helper.delay(
        10000,
        acc,
        `错误 :${JSON.stringify(error)}，10 秒后重试`,
        core
      );
    }

    await 操作(account, proxy);
  }
}

async function 启动机器人() {
  return new Promise(async (resolve, reject) => {
    try {
      logger.info(`机器人启动`);
      if (accountLists.length == 0)
        throw Error("请先在 accounts.js 文件中输入账户");

      if (proxyList.length != accountLists.length && proxyList.length != 0)
        throw Error(
          `您有 ${accountLists.length} 个账户，但提供了 ${proxyList.length} 个代理`
        );

      const promiseList = [];

      for (const acc of accountLists) {
        const accIdx = accountLists.indexOf(acc);
        const proxy = proxyList[accIdx];

        promiseList.push(操作(acc, proxy));
      }

      await sqlite.createTable();
      await Promise.all(promiseList);
      resolve();
    } catch (error) {
      logger.info(`机器人已停止`);
      logger.error(JSON.stringify(error));
      reject(error);
    }
  });
}

(async () => {
  try {
    logger.clear();
    logger.info("");
    logger.info("应用程序启动");
    console.log("RWA 机器人启动");
    console.log();
    Helper.showSkelLogo();
    await 启动机器人();
  } catch (error) {
    console.log("执行机器人时出错", error);
    await 启动机器人();
  }
})();
