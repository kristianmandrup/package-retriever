import {
  parse
} from '..'

describe('npm', () => {
  it('parses npm template', () => {
    const name = 'find-derived'
    const version = '1.0.0'
    const template = `${name}@${version}`
    const options = {}
    const parsed = parse.npmPackage(template, options)
    expect(parsed).toBeTruthy()
    expect(parsed).toEqual({
      type: 'npm',
      name,
      version
    })
  })

  it('aborts on non-npm package template', () => {
    const template = './a/local-path'
    const options = {}
    const parsed = parse.local(template, options)
    expect(parsed).toBeFalsy()
  })
})
