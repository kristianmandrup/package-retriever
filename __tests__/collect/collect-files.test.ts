import {
  collectTemplateFilesFrom
} from '..'
import * as mockFs from 'mock-fs'

describe('collectTemplateFilesFrom', () => {

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

  beforeEach(() => {
    // use mockfs
    mockFs(fileStruct)
  })

  afterAll(() => {
    mockFs.restore()
  })

  it('collects files from each path', async () => {
    const options = {}
    const templatePaths = [
      'my/templates',
      'my/other/templates'
    ]

    const files: string[] = await collectTemplateFilesFrom(templatePaths, options)
    console.log({
      files
    })
    expect(files.length).toBeGreaterThan(0)
  })
})
