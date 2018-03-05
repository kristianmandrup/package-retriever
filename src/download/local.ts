import {
  utils
} from '../utils'

const {
  readPkg
} = utils

const defaults = {
  configFileName: 'sao.js'
}

function getConfigFileName(configFileName: string, pkg: any) {
  return configFileName || (pkg && pkg.sao) || defaults.configFileName
}

export function fromLocal(parsed: any, options?: any) {
  let configFileName = utils.parseOpts(options, 'configFileName')
  if (!configFileName) {
    throw new Error('fromLocal: missing configFileName')
  }
  if (typeof parsed !== 'object') {
    throw new Error(`fromLocal: parsed must be an object, was: ${parsed}`)
  }

  if (parsed.type !== 'local') return false
  const dest = parsed.path
  const templatePkg = readPkg(dest)
  configFileName = getConfigFileName(configFileName, templatePkg)

  return {
    dest,
    templatePkg,
    configFileName
  }
}
