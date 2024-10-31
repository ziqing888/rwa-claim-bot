import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";
import { Helper } from "../../utils/helper.js";
import logger from "../../utils/logger.js";

export class API {
  constructor(url, proxy) {
    this.url = url;
    this.proxy = proxy;
    this.ua = Helper.randomUserAgent();
  }

  generateHeaders(token = this.query) {
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
      "Content-Type": "application/json",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Site": "same-site",
      "Sec-Fetch-Mode": "cors",
      "User-Agent": this.ua,
    };

    if (token) {
      headers.Authorization = `Bearer ${
        token.includes("Bearer ") ? token.replace("Bearer ", "") : token
      }`;
    }

    return headers;
  }

  replaceSensitiveData(str) {
    if (this.something) {
      if (typeof this.something === "string") {
        const regex = new RegExp(this.something, "g");
        return str.replace(regex, "?????");
      } else if (Array.isArray(this.something)) {
        this.something.forEach((sensitiveItem) => {
          const regex = new RegExp(sensitiveItem, "g");
          str = str.replace(regex, "?????");
        });
      }
    }
    return str;
  }

  async fetch(
    endpoint,
    method,
    token,
    body = {},
    additionalHeader = {},
    isCustomUrl = false
  ) {
    const url = isCustomUrl ? endpoint : `${this.url}${endpoint}`;
    try {
      const headers = {
        ...this.generateHeaders(token),
        ...additionalHeader,
      };
      const options = {
        headers,
        method,
        referer: this.origin + "/",
      };

      logger.info(
        `${method} : ${this.replaceSensitiveData(url)} ${
          this.proxy ? this.proxy : ""
        }`
      );

      const dumHeader = headers;
      for (let key in dumHeader) {
        dumHeader[key] = this.replaceSensitiveData(dumHeader[key]);
      }
      logger.info(`请求头：${JSON.stringify(dumHeader)}`);

      if (method !== "GET") {
        options.body = `${JSON.stringify(body)}`;
        const dumBody = this.replaceSensitiveData(options.body);
        logger.info(`请求体：${dumBody}`);
      }

      if (this.proxy) {
        options.agent = new HttpsProxyAgent(this.proxy, {
          rejectUnauthorized: false,
        });
      }
      const res = await fetch(url, options);
      logger.info(`响应：${res.status} ${res.statusText}`);

      if (res.ok || res.status == 400 || res.status == 403) {
        const contentType = res.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
          data.status = res.status;
        } else {
          data = {
            status: res.status,
            message: await res.text(),
          };
        }

        if (res.ok) data.status = 200;
        let responseData = JSON.stringify(data);
        responseData = this.replaceSensitiveData(responseData);
        if (responseData.length > 200) {
          responseData = responseData.substring(0, 200) + "...";
        }

        logger.info(`响应数据：${responseData}`);
        return data;
      } else {
        throw res;
      }
    } catch (err) {
      if (err.status) {
        if (err.status == 404 || err.status == 503) {
          console.error(`检测到 API 变更，停止机器人`);
          throw Error(`检测到 API 变更，停止机器人`);
        }
        throw Error(`${err.response.status} - ${err.response.statusText}`);
      }
      if (err.response) {
        throw Error(`${err.response.status} - ${err.response.statusText}`);
      }
      throw Error(`${err.message}`);
    }
  }
}
