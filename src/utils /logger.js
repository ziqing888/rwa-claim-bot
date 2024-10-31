import { createLogger, format, transports } from "winston";
import fs from "fs";
const { combine, timestamp, printf, colorize } = format;

// 自定义日志格式
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

class 日志记录器 {
  constructor() {
    this.logger = createLogger({
      level: "debug",
      format: combine(
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        colorize(),
        customFormat
      ),
      transports: [new transports.File({ filename: "log/app.log" })],
      exceptionHandlers: [new transports.File({ filename: "log/app.log" })],
      rejectionHandlers: [new transports.File({ filename: "log/app.log" })],
    });
  }

  信息(message) {
    this.logger.info(message);
  }

  警告(message) {
    this.logger.warn(message);
  }

  错误(message) {
    this.logger.error(message);
  }

  调试(message) {
    this.logger.debug(message);
  }

  设置级别(level) {
    this.logger.level = level;
  }

  清空() {
    fs.truncate("log/app.log", 0, (err) => {
      if (err) {
        this.logger.error("清除日志文件失败: " + err.message);
      } else {
        this.logger.info("日志文件已清空");
      }
    });
  }
}

export default new 日志记录器();
