#!/usr/bin/env node
const { stat, readFile, writeFile, unlink } = require('fs').promises
const { resolve, dirname, relative } = require('path')
const program = require('commander')
const { version } = require('../package.json')
const { build } = require('../build/rollup')

async function createProject(svgDir, outputPath) {
  svgDir = resolve(svgDir)

  try {
    await stat(svgDir)

    let code = await readFile(resolve(__dirname, '../build/index.js'), 'utf-8')
    code = code.replace('{{path}}', relative(__dirname, svgDir).replace(/\\/g, '/'))

    const indexCache = resolve(__dirname, './_index.js')
    const output = resolve(outputPath || dirname(svgDir) + '/dist.js')

    console.warn(`Output: ${output}`)

    await writeFile(indexCache, code)
    await build({ input: indexCache, svgDir, output })
    await unlink(indexCache)
  } catch (error) {
    console.error(error)
  }
}

program.version(version)
program.option('-d, --dir <source>', 'svg dir').option('-o, --output <path>', 'output file path')
program.parse(process.argv)
const options = program.opts()

createProject(options.dir, options.output)
