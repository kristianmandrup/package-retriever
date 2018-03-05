import {
  collectTemplateFilesFrom,
  flatTemplateFilesFrom
} from '..'
import * as mockFs from 'mock-fs'

// async function iterate(templatePaths: string[]): Promise<string[]> {
//   const promises = templatePaths.map(async (templatePath: string) => {
//     // console.log('read', templatePath)
//     return 'x'
//   })
//   return Promise.all(promises)
// }

describe('collect', () => {
  const fileStruct = {
    'my': {
      'templates': {
        'a': `a`,
        'b': `b`
      },
      'other': {
        'templates': {
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


  describe('collectTemplateFilesFrom', () => {
    it('collects files from each path into multiple lists', async () => {
      const options = {}
      const templatePaths = [
        'my/templates',
        'my/other/templates'
      ]

      const files: Array<string>[] = await collectTemplateFilesFrom(templatePaths, options)
      expect(files.length).toBeGreaterThan(0)
      expect(files[0]).toEqual([
        'my/templates/a',
        'my/templates/b'
      ])
      expect(files[1]).toEqual([
        'my/other/templates/a',
        'my/other/templates/d'
      ])
    })
  })


  describe('flatTemplateFilesFrom', () => {
    it('collects files from each path into one list', async () => {
      const options = {}
      const templatePaths = [
        'my/templates',
        'my/other/templates'
      ]

      const files: string[] = await flatTemplateFilesFrom(templatePaths, options)
      expect(files.length).toBeGreaterThan(0)
      expect(files).toEqual([
        'my/templates/a',
        'my/templates/b',
        'my/other/templates/a',
        'my/other/templates/d'
      ])
    })
  })
})
