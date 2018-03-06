import {
  fromExistingTemplate
} from '..'

import * as mockFs from 'mock-fs'

describe('fromExistingTemplate', () => {
  const fileStruct = {
    'node_modules': {
      'my-template': {
        'package.json': `{
"name": "my-template"
}`
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

  it('aborts when no such template exists', () => {
    const dest = 'unknown-template'
    const options = {
      dest
    }
    const badPkg = () => fromExistingTemplate(options)
    expect(badPkg).toThrow()
  })

  it('retrieves from local cache', () => {
    const dest = 'node_modules/my-template'
    const options = {
      dest
    }
    const pkg = fromExistingTemplate(options)
    expect(pkg).toEqual({
      "pkg": {
        "name": "my-template"
      },
      "pkgPath": "node_modules/my-template/package.json"
    })
  })
})
