import * as path from 'path'
import * as EventEmitter from 'events'
import * as fs from 'fs-extra'
import * as home from 'user-home'
import * as readPkgJson from 'read-package-json'
import * as readJsonSync from 'read-json-sync'
import {
  promisify
} from 'util'

const asyncReadPkgJson = promisify(readPkgJson)

export const defaults = {
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
  const packagesDir = parseOpts(options, 'packagesDir')
  validatePath(packagesDir, 'packagesDir')
  return path.join(packagesDir, 'node_modules', name)
}

export async function asyncReadPkg(dir: string) {
  try {
    validatePath(dir, 'pkg dir')
    const pkgPath = path.join(dir, 'package.json')
    const pkg = await asyncReadPkgJson(pkgPath, null, false)
    return {
      pkg,
      pkgPath
    }
  } catch (err) {
    // if (err.code === 'MODULE_NOT_FOUND') {
    //   return null
    // }
    throw err
  }
}

export function readPkg(dir: string) {
  try {
    validatePath(dir, 'pkg dir')
    const pkgPath = path.join(dir, 'package.json')
    const pkg = readJsonSync(pkgPath)
    return {
      pkg,
      pkgPath
    }
  } catch (err) {
    // if (err.code === 'MODULE_NOT_FOUND') {
    //   return null
    // }
    throw err
  }
}


export function parseOpts(options: any, key: string) {
  return typeof options === 'string' ? options : options[key]
}

export async function ensurePackages(options: any, pkg?: any) {
  const packagesDir = parseOpts(options, 'packagesDir')
  validatePath(packagesDir, 'packagesDir')
  pkg = pkg || options.pkg || defaults.pkg || {}
  try {
    await fs.ensureDir(packagesDir)
    const pkgPath = path.join(packagesDir, 'package.json'),
    await fs.writeFile(
      path.join(packagesDir, 'package.json'),
      JSON.stringify(pkg),
      'utf8'
    )
    return pkgPath
  } catch (err) {
    throw new Error(`ensurePackages: invalid packagesDir: ${packagesDir}`)
  }
}

export async function ensureRepos(options: any) {
  const reposDir = parseOpts(options, 'reposDir')
  validatePath(reposDir, 'reposDir')
  try {
    return await fs.ensureDir(reposDir)
  } catch (err) {
    throw new Error(`ensurePackages: invalid packagesDir: ${reposDir}`)
  }
}

export const utils = {
  ensureRepos,
  ensurePackages,
  getPackageTemplatePath,
  createConfig,
  readPkg,
  asyncReadPkg,
  parseOpts,
  defaults
}
