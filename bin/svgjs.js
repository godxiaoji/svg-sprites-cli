#!/usr/bin/env node
const { stat, readFile, writeFile, unlink } = require('fs').promises
const { resolve, dirname, relative } = require('path')
const program = require('commander')
const { version } = require('../package.json')
const { build } = require('../build/rollup')
const deepmerge = require('deepmerge')

async function createProject(config) {
  const svgDir = resolve(config.dir)

  try {
    await stat(svgDir)

    let code = await readFile(resolve(__dirname, '../build/index.js'), 'utf-8')
    code = code.replace('{{path}}', relative(__dirname, svgDir).replace(/\\/g, '/'))

    const indexCache = resolve(__dirname, './_index.js')
    config.input = indexCache
    config.output = resolve(config.output || dirname(svgDir) + '/dist.js')
    config.svgDir = svgDir

    console.warn(`Output: ${config.output}`)

    await writeFile(indexCache, code)
    await build(config)
    await unlink(indexCache)
  } catch (error) {
    console.error(error)
  }
}

function buildConfig(options) {
  let config = require('../build/default-config.js')

  if (options.config) {
    config = deepmerge(config, require(resolve(options.config)))
  }

  options.dir && (config.dir = options.dir)
  options.output && (config.output = options.output)

  return config
}

program.version(version)
program
  .option('-d, --dir <dir>', 'svg dir')
  .option('-o, --output <path>', 'output file path')
  .option('-c, --config <path>', 'config file path')
program.parse(process.argv)
const options = program.opts()

createProject(buildConfig(options))
