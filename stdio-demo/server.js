// process.stdout.write(process.pid + '\n')

process.stdin.on('data', (data) => {
  const resp = `AI 复述： ${data.toString().trim()}`
  process.stdout.write(resp + '\n')
})
