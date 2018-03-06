import {
  fromNpm
} from '../..'

describe('download', () => {
  const dest = 'my-npm/packages'
  let pkgPath = 'my/pkg-path'

  describe('fromNpm', () => {

    const packageName = 'abc'

    it('aborts when not an npm def', () => {
      const options = {
        dest,
        pkgPath
      }
      const pkg = fromNpm(packageName, )
      expect(pkg).toBeDefined()
    })

    it('retrieves from local cache', () => {
      const pkg = fromNpm(packageName, { dest })
      expect(pkg).toBeDefined()
    })
  })
})
