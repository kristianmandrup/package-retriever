const githubUrl = ''

import * as mockFs from 'mock-fs'
import * as nock from 'nock'

interface IGitRoutes {
  userRepo: {
    valid: string
    invalid: string
  }
}

interface IDownloadFixtures {
  zipPath: string
}

interface IGitDownloadConfig {
  route: IGitRoutes
  fixtures: IDownloadFixtures
  gitBaseUrl: string
}

export function configMock(options: IGitDownloadConfig) {
  const { route, fixtures, gitBaseUrl } = options
  nock(gitBaseUrl)
    .persist()
    .get(route.userRepo.invalid)
    .reply(404)
    .get(route.userRepo.valid)
    .replyWithFile(200, fixtures.zipPath)
}
