import {
  fromLocal
} from '..'

import * as mockFs from 'mock-fs'
describe('fromLocal', () => {

  const fileStruct = {
    'my': {
      'templates': {
        'a': `a`,
        'b': `b`,
        'package.json': `{
  "name": "my-template"
}`
      }
    }
  }

  const options = {
    // createTmp: true,
    // createCwd: false
  }

  beforeEach(() => {
    // use mockfs
    mockFs(fileStruct, options)
  })

  afterAll(() => {
    mockFs.restore()
  })

  it('when not a local parsed: aborts ', () => {
    const dest = ''
    const parsed = {
      type: 'npm',
      name: 'hello'
    }
    const getPkg = () => fromLocal(parsed, { dest })
    expect(getPkg).toThrow()
  })

  interface ILocalDownloadConfig {
    dest: string
    templatePkg: any
    configFileName: string
  }

  it('when a local parsed: retrieves from local cache ', () => {
    const configFileName = 'sao.js'
    const parsed = {
      type: 'local',
      path: './my/templates'
    }
    const options = {
      configFileName
    }
    const result = fromLocal(parsed, options)
    if (result) {
      const pkg: ILocalDownloadConfig = result
      expect(typeof pkg).toBe('object')
      expect(typeof pkg.dest).toBe('string')
      expect(pkg.dest).toBe('./my/templates')
      expect(typeof pkg.templatePkg).toBe('object')
      expect(pkg.templatePkg).toBe({})
      expect(pkg.configFileName).toBe(configFileName)
    }
  })
})
