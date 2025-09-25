import { sum, createFile, tools } from "./utils.js"

// 服务器状态
let isInitialized = false

/**
 * 处理 MCP 请求的主函数
 * @param {Object} request - JSON-RPC 请求对象
 * @returns {Object} JSON-RPC 响应对象
 */
async function handleRequest(request) {
  try {
    switch (request.method) {
      case 'initialize':
        // MCP 协议初始化
        return {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {
              listChanged: true
            }
          },
          serverInfo: {
            name: "mcp-demo-server",
            version: "1.0.0"
          }
        }

      case 'tools/list':
        // 返回可用工具列表
        return {
          tools: tools
        }

      case 'tools/call':
        // 调用指定工具
        const { name, arguments: args } = request.params
        let result

        if (name === 'sum') {
          result = sum(args.a, args.b)
        } else if (name === 'createFile') {
          result = await createFile(args.filename, args.content)
        } else {
          throw new Error(`未知工具: ${name}`)
        }

        return {
          content: [
            {
              type: "text",
              text: result
            }
          ]
        }

      default:
        throw new Error(`不支持的方法: ${request.method}`)
    }
  } catch (error) {
    throw {
      code: -32603,
      message: error.message
    }
  }
}

/**
 * 处理 MCP 通知的函数
 * @param {Object} notification - JSON-RPC 通知对象
 */
async function handleNotification(notification) {
  try {
    switch (notification.method) {
      case 'notifications/initialized':
        // 客户端初始化完成通知
        isInitialized = true
        console.error('MCP 客户端初始化完成') // 使用 stderr 输出日志，避免干扰 JSON-RPC 通信
        break

      default:
        console.error(`收到未知通知: ${notification.method}`)
        break
    }
  } catch (error) {
    console.error(`处理通知时出错: ${error.message}`)
  }
}

/**
 * 发送 JSON-RPC 响应
 * @param {Object} response - 响应对象
 */
function sendResponse(response) {
  process.stdout.write(JSON.stringify(response) + '\n')
}

/**
 * 发送错误响应
 * @param {string|number} id - 请求 ID
 * @param {Object} error - 错误对象
 */
function sendError(id, error) {
  const errorResponse = {
    jsonrpc: '2.0',
    id: id,
    error: error
  }
  sendResponse(errorResponse)
}

// 监听标准输入
process.stdin.on('data', async (data) => {
  try {
    const message = JSON.parse(data.toString().trim())
    
    // 检查是否为通知（没有 id 字段）
    if (message.id === undefined) {
      // 处理通知，不需要响应
      await handleNotification(message)
      return
    }
    
    // 处理请求
    const result = await handleRequest(message)
    
    // 发送成功响应
    const response = {
      jsonrpc: '2.0',
      id: message.id,
      result: result
    }
    sendResponse(response)
    
  } catch (error) {
    // 发送错误响应
    let messageId = null
    try {
      const message = JSON.parse(data.toString().trim())
      messageId = message.id
    } catch (parseError) {
      // 解析失败，使用 null 作为 ID
    }
    
    sendError(messageId, {
      code: -32700,
      message: '解析错误: ' + error.message
    })
  }
})

// 处理进程退出
process.on('SIGINT', () => {
  process.exit(0)
})

process.on('SIGTERM', () => {
  process.exit(0)
})