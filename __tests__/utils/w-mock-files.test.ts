import {
  utils
} from '..'

import * as mockFs from 'mock-fs'

describe('utils', () => {
  describe('Read package.json', () => {
    const fileStruct = {
      'node_modules': {
        'my-template': {
          'package.json': `{
  "name": "my-template"
}`
        }
      },
      'my': {
        'repos': {
          'a': `a`,
          'b': `b`
        },
        'sweet': {
          'packages': {
            'a': `a`,
            'd': `d`
          },
        }
      }
    }

    beforeAll(() => {
      // use mockfs
      mockFs(fileStruct)
    })

    afterAll(() => {
      mockFs.restore()
    })
    describe('asyncReadPkg', () => {
      it('when package.json in dir: reads package data', async () => {
        const $path = 'node_modules/my-template'
        const result = await utils.asyncReadPkg($path)
        const expectedPath = $path + '/package.json'

        expect(result.pkgPath).toBe(expectedPath)
        expect(result.pkg.name).toBe('my-template')
      })
    })

    describe('readPkg', () => {
      it('when package.json NOT in dir: fails with null', () => {
        const badRead = () => utils.readPkg('not-existing')
        expect(badRead).toThrow()
      })

      it('when package.json in dir: reads package data', () => {
        const $path = 'node_modules/my-template'
        const result = utils.readPkg($path)
        const expectedPath = $path + '/package.json'

        expect(result).toEqual({
          pkg: {
            "name": "my-template"
          },
          pkgPath: expectedPath
        })
        expect(result.pkgPath).toBe($path + '/package.json')
        expect(result.pkg.name).toBe('my-template')
      })

    })
  })
})
