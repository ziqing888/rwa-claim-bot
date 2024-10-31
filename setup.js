import fs from "fs";
import path from "path";

// 检查文件是否存在
async function 文件存在(filePath) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// 复制文件
async function 复制文件(src, dest) {
  try {
    if (await 文件存在(dest)) {
      console.log(`文件已存在于 ${dest}，跳过复制。`);
    } else {
      await fs.promises.copyFile(src, dest);
      console.log(`已复制 ${src} 到 ${dest}`);
    }
  } catch (err) {
    console.error(`从 ${src} 到 ${dest} 复制文件时出错:`, err);
  }
}

// 复制操作列表
const 复制操作 = [
  {
    src: path.join("config", "config_tmp.js"),
    dest: path.join("config", "config.js"),
  },
  {
    src: path.join("config", "proxy_list_tmp.js"),
    dest: path.join("config", "proxy_list.js"),
  },
  {
    src: path.join("accounts", "accounts_tmp.js"),
    dest: path.join("accounts", "accounts.js"),
  },
];

(async () => {
  console.log(`复制模板文件中`);
  for (let { src, dest } of 复制操作) {
    await 复制文件(src, dest);
  }
  console.log(`\n设置完成`);
  console.log(
    `请打开并配置以下文件:\n- accounts/accounts.js\n- config/config.js\n- config/proxy_list.js`
  );
})();
