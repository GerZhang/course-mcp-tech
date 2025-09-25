# MCP SDK Demo

这是一个使用官方 MCP SDK 构建的 MCP (Model Context Protocol) 服务器实现，展示了如何使用现代化的 SDK 工具来快速开发 MCP 服务器。

## Getting start

```bash
cd mcp-sdk-demo
npm install
node server.js
```

服务器启动后会监听标准输入，等待 MCP 协议消息。

您可以通过 [mcp inspector](https://modelcontextprotocol.io/docs/tools/inspector) 进行连接测试：

```bash
npx @modelcontextprotocol/inspector
```
