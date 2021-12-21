const req = require.context('{{path}}', true, /\.svg$/)

const obj = {}

req
  .keys()
  .map(req)
  .forEach(v => {
    obj[v.default.id] = v.default
  })

export default obj