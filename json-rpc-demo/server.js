import utils from './utils.js'

process.stdin.on('data', (data) => {
  const req = JSON.parse(data)
  const funcName = req.method
  const params = req.params
  const result = utils[funcName](params)
  const resp = {
    jsonrpc: '2.0',
    id: req.id,
    result
  }
  process.stdout.write(JSON.stringify(resp) + '\n')
})
