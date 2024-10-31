export class Config {
  static TRWASTAKINGAMOUNT = 2500; // 在池中抵押的 TRWA 数量（目前水龙头提供 15K TRWA，共有 5 个池）例如：1000
  static GWEIPRICE = 1.5; // GWEI 价格
  static WAITFORBLOCKCONFIRMATION = true; // 如果为 true，则交易执行后机器人会等待交易被矿工确认；如果为 false，则交易执行后机器人会继续执行下一笔交易
  static DISPLAY = "BLESS"; // 显示模式：TWIST 或 BLESS
}
