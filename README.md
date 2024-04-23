# HakimiHospital

虚拟宠物医院学习系统前端，基于Vue2与ElementUI。

Virtual Pet Hospital Learning System (front-end) base on Vue2 & ElementUI.

## 安装依赖

请确保你有合适版本的Node.js工具（18 LTS），随后在目录下运行以下命令安装依赖：

```bash
npm install
```

## 运行

运行 `npm run serve` 以在本地5000端口上启动devServer，

或者运行 `npm run build` 以获得一个打包好的前端工程以部署在nginx或Apache上。

```bash
npm run serve
```

请注意，`vue.config.js` 在devServer上配置了proxy代理，

默认指向localhost:8080/，这是为了解决前后端跨域CORS问题。
