import * as path from 'path'
import * as filenamify from 'filenamify'
import {
  fromExistingTemplate
} from '../existing'
import {
  downloadRepo,
} from './download-repo'

import {
  asyncDownload,
  fetchRepo
} from './download'

export const repo = {
  asyncDownload,
  downloadRepo,
  fetchRepo,
  tryFromRepo,
  fromRepo
}

export interface IRepoDef {
  user: string
  name: string
  version?: string
}

import {
  validatePath
} from '../../utils'

export function tryFromRepo(parsed: any, options: any = {}) {
  if (parsed.type !== 'repo') return false
  return fromRepo(parsed, options)
}

export async function fromRepo(repo: IRepoDef, options: any = {}) {
  const {
    mustDownload,
    clone,
    reposDir
  } = options

  validatePath(reposDir, 'reposDir')

  const folderName = filenamify(
    `${repo.user}%%${repo.name.replace('/', '-')}`
  )
  const dest = path.join(reposDir, folderName)
  const opts = {
    dest,
    clone
  }

  return mustDownload && await downloadRepo(repo, opts) || fromExistingTemplate(opts)
}
