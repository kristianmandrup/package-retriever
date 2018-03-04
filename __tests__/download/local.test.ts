import {
  fromLocal
} from '..'

describe('fromLocal', () => {
  it('aborts when ...', () => {
    const dest = ''
    const pkg = fromLocal({ dest })
    expect(pkg).toBeDefined()
  })

  it('retrieves from local cache', () => {
    const dest = 'x/y'
    const pkg = fromLocal({ dest })
    expect(pkg).toBeDefined()
  })
})
