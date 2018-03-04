import {
  fromExistingTemplate
} from '..'

describe('fromExistingTemplate', () => {
  it('aborts when ...', () => {
    const dest = ''
    const pkg = fromExistingTemplate({ dest })
    expect(pkg).toBeDefined()
  })

  it('retrieves from local cache', () => {
    const dest = ''
    const pkg = fromExistingTemplate({ dest })
    expect(pkg).toBeDefined()
  })
})
