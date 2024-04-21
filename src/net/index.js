/* eslint-disable no-unused-vars */
import config from "../../config.yaml";
import axios from "axios";
import { AxiosHeaders } from "axios";

export class NetLoader {
  /**
   * @description 构造函数中传入的env为环境变量 -- 测试环境 或者 开发环境
   * @param {"test" | "dev"} env
   */
  constructor(env = "dev") {
    this.env = env;
    // this.baseURL = config.env[this.env].base_url;
    this.baseURL = "";
    this.instance = axios.create({
      timeout: 30000,
      baseURL: this.baseURL,
      headers: {
        "Content-Encoding": "utf-8",

      },
    });
    this.instance.interceptors.request.use((config) => {
      if (config.url === "/users/login") {
        return config;
      }
      if (window.localStorage.getItem("token")) {
        config.headers["token"] = window.localStorage.getItem("token");
      }
      return config;
    });
  }

  /**
   * @description 发生get 请求
   * @param {string} url
   * @param {{}} params
   * @param { AxiosHeaders } headers
   * @param {"arraybuffer" | "blob" | "json"} responseType
   * @returns {Promise<any>}
   */
  get(url, params, headers = {}, responseType = "json") {
    return new Promise((res, rej) => {
      this.instance.get(url, { params, headers, responseType }).then(
        (val) => {
          res(val);
        },
        (err) => {
          rej(err);
        }
      );
    });
  }

  /**
   * @description 发生post请求
   * @param {string} url
   * @param {{}} data
   * @returns {Promise<any>}
   */
  post(url, data, headers = {}) {
    return new Promise((res, rej) => {
      this.instance.post(url, data, { headers }).then(
        (val) => {
          res(val);
        },
        (err) => {
          rej(err);
        }
      );
    });
  }

  /**
   * @description 发生put请求
   * @param {string} url
   * @param {{}} data
   * @returns {Promise<any>}
   */
  put(url, data, headers = {}) {
    return new Promise((res, rej) => {
      this.instance.put(url, data, { headers }).then(
        (val) => {
          res(val);
        },
        (err) => {
          rej(err);
        }
      );
    });
  }

  /**
   * @description 发生delete 请求
   * @param {string} url
   * @param {{}} data
   * @returns {Promise<any>}
   */
  delete(url, data, headers = {},) {
    return new Promise((res, rej) => {
      this.instance.delete(url, { data, headers }).then(
        (val) => {
          res(val);
        },
        (err) => {
          rej(err);
        }
      );
    });
  }
}
