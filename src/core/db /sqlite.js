import sqlite3 from "sqlite3";
import { open } from "sqlite";

class SQLITE {
  // 连接到数据库
  async connectToDatabase() {
    return open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });
  }

  // 创建数据表
  async createTable() {
    const db = await this.connectToDatabase();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tx_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT NOT NULL,
        tx_date DATE NOT NULL,
        type TEXT CHECK(type IN ('claim TRWA', 'mint USDC', 'stake', 'approve'))
      )
    `);
    await db.close();
  }

  // 插入数据
  async insertData(address, txDate, type) {
    const db = await this.connectToDatabase();
    await db.run(
      "INSERT INTO tx_log (address, tx_date, type) VALUES (?, ?, ?)",
      [address, txDate, type]
    );
    await db.close();
  }

  // 获取今天的交易日志
  async getTodayTxLog(address, type) {
    const db = await this.connectToDatabase();
    const todayISO = new Date().toISOString().split("T")[0];
    const todayTxLog = await db.all(
      `
      SELECT * FROM tx_log
      WHERE DATE(tx_date) = ? AND address = ? AND type = ?
      ORDER BY tx_date DESC
    `,
      [todayISO, address, type]
    );
    await db.close();
    return todayTxLog;
  }

  // 获取指定地址和类型的所有交易日志
  async getTxLog(address, type) {
    const db = await this.connectToDatabase();
    const txLog = await db.all(
      `
      SELECT * FROM tx_log
      WHERE address = ? AND type = ?
    `,
      [address, type]
    );
    await db.close();
    return txLog;
  }
}

const sqlite = new SQLITE();
await sqlite.createTable();

export default sqlite;
