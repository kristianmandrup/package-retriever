import {
  fromExistingTemplate
} from '../existing'
import {
  downloadFromNpm
} from './download-npm'

import {
  getPackageTemplatePath
} from '../../utils'

export const npm = {
  downloadFromNpm,
  tryFromNpm,
  fromNpm
}

/**
 * download from npm
 * @param parsed
 * @param options
 */
export async function tryFromNpm(parsed: any, options?: any) {
  if (parsed.type !== 'npm') return false

  const packageName = parsed.scoped ?
    `@${parsed.user}/${parsed.name}` :
    parsed.name

  options.version = parsed.version
  return await fromNpm(packageName, options)
}

export async function fromNpm(packageName: string, options?: any) {
  const {
    mustDownload,
    exists,
    forceNpm
  } = options

  const dest = getPackageTemplatePath(packageName, options)

  const opts = {
    dest,
    exists,
    forceNpm,
    packageName
  }

  return mustDownload && downloadFromNpm(opts) || fromExistingTemplate(opts)
}
