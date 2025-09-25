# STDIO Demo

这是一个展示基于标准输入输出 (stdin/stdout) 进程间通信的演示项目，展示了如何在 Node.js 中实现客户端-服务器通信模式。

## Getting start

```bash
npm install
node client.js
```
### 通信模式

1. **客户端** (`client.js`) 启动服务器进程
2. **服务器** (`server.js`) 监听标准输入
3. 客户端通过服务器进程的 `stdin` 发送消息
4. 服务器通过 `stdout` 返回响应
5. 客户端监听服务器进程的 `stdout` 接收响应