
// 工具1：求和
export function sum(a, b) {
  const result = Number(a) + Number(b);
  return `计算结果：${a} + ${b} = ${result}`;
}

// 工具2：创建文件
export async function createFile(filename, content) {
  const fs = await import('fs/promises'); // 动态导入 fs/promises（支持异步文件操作）
  try {
    await fs.writeFile(filename, content);
    return `文件 "${filename}" 创建成功，内容已写入。`;
  } catch (err) {
    throw new Error(`创建文件 "${filename}" 失败：${err.message}`);
  }
}

// 工具列表说明
export const tools = [
  {
    name: 'sum',
    title: '两数求和',
    description: '计算两个数字的和',
    inputSchema: {
      type: 'object',
      properties: {
        a: { type: 'number', description: '第一个数字' },
        b: { type: 'number', description: '第二个数字' }
      },
      required: ['a', 'b']
    }
  },
  {
    name: 'createFile',
    title: '创建文件',
    description: '创建一个文本文件',
    inputSchema: {
      type: 'object',
      properties: {
        filename: { type: 'string', description: '文件名（如：note.txt）' },
        content: { type: 'string', description: '文件内容' }
      },
      required: ['filename', 'content']
    }
  }
]