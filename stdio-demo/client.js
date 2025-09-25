import { spawn } from 'child_process'

// 启动服务端进程
const serverProcess = spawn('node', ['server.js'])

// 监听服务端进程的标准输出
serverProcess.stdout.on('data', (data) => {
  console.log(data.toString().trim())
})

// 测试消息发送
const messages = [
  "明月几时有？",
  "把酒问青天。",
  "不知天上宫阙，",
  "今夕是何年。"
]

messages.forEach((message, index) => {
  setTimeout(() => {
    console.log(`-->：${message}`)
    serverProcess.stdin.write(message + '\n')
  }, index * 1000)
})
