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


  describe('downloadRepo', () => {
    it('downloads the repo', async () => {
      const repoDef = {
        user: 'kristianmandrup',
        name: 'find-derived'
      }

      const dest = 'packages'
      const options = {
        dest
      }
      const downloaded = await repo.downloadRepo(repoDef, options)
      expect(downloaded).toBe({})
    })
  })
})
