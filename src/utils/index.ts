import * as path from 'path'
import * as EventEmitter from 'events'
import * as fs from 'fs-extra'
import * as home from 'user-home'
import * as readDirCb from 'recursive-readdir'
import {
  promisify
} from 'util'

const recursiveReadDir = promisify(readDirCb);

const defaults = {
  readDir: recursiveReadDir,
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

/**
 * collect all template files from list of template file paths
 * @param templatePaths
 * @param options
 */
export function collectTemplateFilesFrom(templatePaths: string[], options: any = {}) {
  let readDir = options.readDir || defaults.readDir
  const promises = templatePaths.map(async (templatePath) => {
    return await readDir(templatePath)
  })
  return Promise.all(promises)
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
  packagesDir = packagesDir || path.join(configDir, 'packages')
  reposDir = reposDir || path.join(configDir, 'repos')
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
  } = options
  return path.join(packagesDir, 'node_modules', name)
}

export function readPkg(dir: string) {
  try {
    return require(path.join(dir, 'package.json'))
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return null
    }
    throw err
  }
}

export async function ensurePackages(options: any) {
  let {
    pkg,
    packagesDir
  } = options
  pkg = pkg || defaults.pkg

  const packagesDirExists = await fs.pathExists(packagesDir)
  if (!packagesDirExists) {
    await fs.ensureDir(packagesDir)
    await fs.writeFile(
      path.join(packagesDir, 'package.json'),
      JSON.stringify(pkg),
      'utf8'
    )
  }
}

export function ensureRepos(options: any) {
  const {
    reposDir
  } = options
  return fs.ensureDir(reposDir)
}

