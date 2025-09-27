import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 创建 MCP 服务器
const server = new McpServer({
  name: "mcp-sdk-server",
  version: "1.0.0"
});

// 注册工具
server.registerTool("sum",
  {
    title: '两数求和',
    description: '计算两个数字的和',
    inputSchema: {
      a: z.number().describe('第一个数字'),
      b: z.number().describe('第二个数字')
    }
  },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: String(`计算结果：${a} + ${b} = ${a + b}`)
    }]
  })
)

server.registerTool("createFile",
  {
    title: '创建文件',
    description: '创建一个文本文件',
    inputSchema: {
      filename: z.string().describe('包含路径的文件名（如：/path/to/note.txt）'),
      content: z.string().describe('文件内容')
    }
  },
  async ({ filename, content }) => {
    const fs = await import('fs/promises');
    try {
      await fs.writeFile(filename, content);
      return {
        content: [{ type: "text", text: `文件 "${filename}" 创建成功，内容已写入。` }]
      }
    } catch (err) {
      return {
        content: [{ type: "text", text: `创建文件 "${filename}" 失败：${err.message}` }]
      }
    }
  }
)

/**
 * 启动 MCP 服务器
 * 使用 stdio 传输协议连接客户端
 */
async function startServer() {
  // 创建 stdio 传输层，正确传入 stdin 和 stdout
  const transport = new StdioServerTransport();

  // 连接服务器和传输层
  await server.connect(transport);

  console.error("MCP SDK 服务器已启动，等待客户端连接...");
}

// 启动服务器
startServer().catch((error) => {
  console.error("服务器启动失败:", error);
  process.exit(1);
});
