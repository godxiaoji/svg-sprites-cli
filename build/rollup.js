const rollup = require('rollup')
const svgSprites = require('rollup-plugin-svg-sprites')
const requireContext = require('@godxiaoji/rollup-plugin-require-context')
const { kebabCase2PascalCase } = require('./util')

async function build({ input, svgDir, output }) {
  const bundle = await rollup.rollup({
    input,
    plugins: [
      requireContext(),
      svgSprites({
        symbolId(filePath) {
          filePath = filePath.replace(svgDir, '').replace(/\\/g, '/')
          if (filePath.indexOf('/') === 0) {
            filePath = filePath.substr(1)
          }

          const paths = filePath.split('/')
          const fileName = paths.pop().replace('.svg', '')
          return 'icon-' + kebabCase2PascalCase([fileName].concat(paths).join('-'))
        }
      })
    ]
  })

  await bundle.write({
    output: {
      format: 'esm',
      file: output,
      banner: '/* eslint-disable */'
    }
  })
}

module.exports = {
  build
}
