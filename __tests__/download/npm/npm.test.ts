import {
  fromNpm
} from '../..'

describe('fromNpm', () => {
  const dest = ''
  const packageName = 'abc'

  it('aborts when ...', () => {
    const pkg = fromNpm(packageName, { dest })
    expect(pkg).toBeDefined()
  })

  it('retrieves from local cache', () => {
    const pkg = fromNpm(packageName, { dest })
    expect(pkg).toBeDefined()
  })
})
