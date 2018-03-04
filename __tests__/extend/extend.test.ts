import {
  extendTemplateSrcWith
} from '..'

describe('extend', () => {
  const mainSrc = {
    files: [
      'root/folder/e/bar.txt',
      'root/folder/f/vix/foo.txt'
    ],
    srcPath: 'root/folder'
  }
  const extendSrc = {
    files: [
      'base/src/e/bar.txt', // overriden by file in mainSrc
      'base/src/b/c/y.txt'
    ],
    srcPath: 'base/src'
  }
  const options = {

  }

  it('extends by merging with extendSrc without duplicates', () => {
    const files = extendTemplateSrcWith(mainSrc, extendSrc, options)
    expect(files.length).toBe(3)
    expect(files[0]).toBe(mainSrc.files[0])
    expect(files[1]).toBe(mainSrc.files[1])
    expect(files[2]).toBe(extendSrc.files[1])
  })
})
