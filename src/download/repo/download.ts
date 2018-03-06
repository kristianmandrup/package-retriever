import * as fs from 'fs-extra'
import * as download from 'download-git-repo'
import { IRepoDef } from '.';

export async function asyncDownload(repoPath: string, dest: string, options: any = {}) {
  return new Promise((resolve, reject) => {
    download(repoPath, dest, options, (err: Error) => {
      if (err) return reject(err)
      resolve(dest)
    })
  })
}

export async function fetchRepo(repo: IRepoDef, dest: string, options: any = {}) {
  return fs.remove(dest).then(() => {
    repo.version = repo.version ? `#${repo.version}` : ''
    const {
      version,
      name,
      user
    } = repo
    const repoPath = `${user}/${name}${version}`
    return asyncDownload(repoPath, dest, options)
  })
}
