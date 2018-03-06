import * as download from './download'
import {
  ensureRepos
} from '../../utils'

export async function downloadRepo(repo: any, options: any = {}) {
  const {
    dest,
    clone,
    event,
    reposDir
  } = options
  await ensureRepos({ reposDir })

  event.emit('download:start')

  await download.fetchRepo(repo, dest, {
    clone
  })

  event.emit('download:stop')
}
