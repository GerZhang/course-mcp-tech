# JSON-RPC Demo

这是一个基础的 JSON-RPC 2.0 服务器实现，展示了基本的 JSON-RPC 协议通信和方法调用。

## Getting start

```bash
cd json-rpc-demo
npm install
node server.js
```

服务器启动后会监听标准输入，等待 JSON-RPC 请求。服务端提供了两个方法：
- `sum` - 数字求和
- `createFile` - 创建文件

您可以在终端输入 `test-data.txt` 所提供的请求消息体进行测试。