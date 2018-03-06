import {
  repo
} from '../..'

import * as path from 'path'
import * as mockFs from 'mock-fs'
import * as nock from 'nock'

// FOR TESTING
// See: https://github.com/flipxfx/download-git-repo/tree/master/test
describe('download', () => {
  const fileStruct = {
    'repos': {
      'packages': {
        'my-template': {
          'package.json': `{
  "name": "my-template"
  }`
        }
      },
    },
    // files.zip
    'files': {
      'foo.txt': 'foo',
      'bar.txt': 'bar',
    }
  }

  beforeAll(() => {
    // use mockfs
    mockFs(fileStruct)

    nock('http://foo.bar')
      .persist()
      .get('/404')
      .reply(404)
      .get('/foo')
      .replyWithFile(200, path.join(__dirname, '../fixtures/files.zip'))
  })

  afterAll(() => {
    mockFs.restore()
  })

  describe('tryFromRepo', () => {
    it('aborts when not a repo def', async () => {
      const parsed = {
        type: 'npm',
        name: 'find-it',
        version: '1.0.1'
      }
      const dest = 'packages'
      const options = {
        dest
      }
      const result = await repo.tryFromRepo(parsed, options)
      expect(result).toBeFalsy()

    })

    it('downloads when a repo def', async () => {
      const parsed = {
        type: 'repo',
        user: 'kristianmandrup',
        name: 'find-it'
      }
      const dest = 'packages'
      const options = {
        dest
      }
      const result = await repo.tryFromRepo(parsed, options)
      expect(result).toBeTruthy()
    })
  })

  describe('fromRepo', () => {
    it.only('downloads from repo', async () => {
      const mustDownload = true
      const reposDir = 'repos/packages'
      const parsed = {
        type: 'repo',
        user: 'kristianmandrup',
        name: 'find-it',
      }

      const options = {
        reposDir,
        mustDownload
      }
      const pkg = await repo.tryFromRepo(parsed, options)
      expect(pkg).toBeDefined()
    })
  })
})
