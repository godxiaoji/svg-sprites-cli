const rollup = require('rollup')
const svgSprites = require('rollup-plugin-svg-sprites')
const requireContext = require('@godxiaoji/rollup-plugin-require-context')

async function build(config) {
  const bundle = await rollup.rollup({
    input: config.input,
    plugins: [
      requireContext(),
      svgSprites({
        symbolId(filePath) {
          let id = filePath.replace(config.svgDir, '').replace(/\\/g, '/')
          if (id.indexOf('/') === 0) {
            id = id.substr(1)
          }

          return config.symbolId(id, filePath)
        }
      })
    ]
  })

  await bundle.write({
    output: {
      format: 'esm',
      file: config.output,
      banner: config.eslintDisable ? '/* eslint-disable */' : null
    }
  })
}

module.exports = {
  build
}
