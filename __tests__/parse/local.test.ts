import {
  parse
} from '..'

describe('local', () => {
  it('parses local template', () => {
    const template = `./a/local/file-path`
    const options = {}
    const parsed: any = parse.local(template, options)
    expect(parsed).toBeTruthy()
    expect(parsed.type).toEqual('local')
    expect(parsed.path).toMatch(template.slice(1))
  })

  it('aborts on non-local template', () => {
    const template = 'kristianmandrup@find-derived'
    const options = {}
    const parsed = parse.local(template, options)
    expect(parsed).toBeFalsy()
  })
})
