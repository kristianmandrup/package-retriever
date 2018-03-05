import * as mockFs from 'mock-fs'

describe('collectTemplateFilesFrom', () => {
  const fileStruct = {
    'my': {
      'templates': {
        'a': `a`,
        'b': `b`
      }
    }
  }

  const options = {
    createTmp: true,
    createCwd: false
  }

  const simpleFs = {}

  beforeEach(() => {
    // use mockfs
    mockFs(simpleFs)
  })

  afterAll(() => {
    mockFs.restore()
  })

  it('mocks', () => {
    expect(1).toBe(1)
  })
})
