import * as fs from 'fs-extra'
import * as downloadRepo from 'download-git-repo'
import { IRepoDef } from '.';

async function download(repoPath: string, dest: string, options: any = {}) {
  return new Promise((resolve, reject) => {
    downloadRepo(repoPath, dest, options, (err: Error) => {
      if (err) return reject(err)
      resolve(dest)
    })
  })
}

export function repo(repo: IRepoDef, dest: string, options: any = {}) {
  return fs.remove(dest).then(() => {
    repo.version = repo.version ? `#${repo.version}` : ''
    const {
      version,
      name,
      user
    } = repo
    const repoPath = `${user}/${name}${version}`
    return download(repoPath, dest, options)
  })
}
