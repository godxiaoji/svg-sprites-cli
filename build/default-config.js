const { kebabCase2PascalCase } = require('./util')

module.exports = {
  prefix: 'icon',
  symbolId(id, path) {
    const paths = id.split('/')
    const name = paths.pop().replace('.svg', '')
    return `${this.prefix}-${kebabCase2PascalCase([name].concat(paths).join('-'))}`
  },
  eslintDisable: false
}
