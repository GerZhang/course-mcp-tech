import fs from 'fs'

export default {
  sum({ a, b }) {
    return a + b
  },
  createFile({ filename, content }) {
    try {
      fs.writeFileSync(filename, content)
      return `文件 ${filename} 已创建`
    } catch (err) {
      return `创建文件 ${filename} 失败：${err.message}`
    }
  }
}
