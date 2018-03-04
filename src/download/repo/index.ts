import * as path from 'path'
import * as filenamify from 'filenamify'
import {
  fromExistingTemplate
} from '../existing'
import {
  downloadRepo
} from './download-repo'

export interface IRepoDef {
  user: string
  name: string
  version?: string
}

export function tryFromRepo(parsed: any, options: any = {}) {
  if (parsed.type !== 'repo') return false
  return fromRepo(parsed, options)
}

export function fromRepo(repo: IRepoDef, options: any = {}) {
  const {
    mustDownload,
    clone,
    reposDir
  } = options

  const folderName = filenamify(
    `${repo.user}%%${repo.name.replace('/', '-')}`
  )
  const dest = path.join(reposDir, folderName)
  const opts = {
    dest,
    clone
  }

  return mustDownload && downloadRepo(repo, opts) || fromExistingTemplate(opts)
}
