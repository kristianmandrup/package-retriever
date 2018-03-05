import * as path from 'path'
import * as EventEmitter from 'events'
import * as fs from 'fs-extra'
import * as home from 'user-home'

const defaults = {
  event: new EventEmitter(),
  configDir: path.join(home, '.sao'),
  pkg: {
    name: 'sao-package-templates',
    version: '0.0.0',
    private: true,
    license: 'MIT',
    dependencies: {}
  }
}

function isPath(filePath: string) {
  return typeof filePath === 'string' && filePath.length > 0
}

export function validatePath(filePath: string, name: string) {
  if (!isPath(filePath)) {
    throw new Error(`${name} must be a valid file path, was: ${filePath}`)
  }
}

/**
 * Create configuration object to be used
 * @param options
 */
export function createConfig(options: any) {
  let {
    configDir,
    packagesDir,
    reposDir,
    event
  } = options

  configDir = configDir || defaults.configDir

  validatePath(configDir, 'configDir')

  packagesDir = packagesDir || path.join(configDir, 'packages')
  validatePath(packagesDir, 'packagesDir')

  reposDir = reposDir || path.join(configDir, 'repos')
  validatePath(reposDir, 'reposDir')

  event = event || defaults.event
  return {
    configDir,
    packagesDir,
    reposDir,
    event
  }
}

export function getPackageTemplatePath(name: string, options: any) {
  const {
    packagesDir
  } = parse(options, 'packagesDir')
  validatePath(packagesDir, 'packagesDir')
  return path.join(packagesDir, 'node_modules', name)
}

export function readPkg(dir: string) {
  try {
    validatePath(dir, 'dir')
    return require(path.join(dir, 'package.json'))
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return null
    }
    throw err
  }
}

function parse(options: any, key: string) {
  return typeof options === 'string' ? options : options[key]
}

export async function ensurePackages(options: any, pkg?: any) {
  let {
    packagesDir
  } = parse(options, 'packagesDir')

  pkg = pkg || options.pkg || defaults.pkg

  validatePath(packagesDir, 'packagesDir')
  try {
    await fs.ensureDir(packagesDir)
    await fs.writeFile(
      path.join(packagesDir, 'package.json'),
      JSON.stringify(pkg),
      'utf8'
    )
  } catch (err) {
    throw new Error(`ensurePackages: invalid packagesDir: ${packagesDir}`)
  }
}

export function ensureRepos(options: any) {
  const {
    reposDir
  } = parse(options, 'reposDir')
  validatePath(reposDir, 'reposDir')
  try {
    return fs.ensureDir(reposDir)
  } catch (err) {
    throw new Error(`ensurePackages: invalid packagesDir: ${reposDir}`)
  }
}

export const utils = {
  ensureRepos,
  ensurePackages,
  getPackageTemplatePath,
  createConfig
}
