import {
  parse
} from '..'

describe('npm', () => {
  it('parses npm template', () => {
    const name = 'find-it'
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

  it('parses npm template with template- prefix', () => {
    const name = 'find-it'
    const parsed = parse.npmPackage(name, { templatePrefix: true })
    expect(parsed).toBeTruthy()
    expect(parsed).toEqual({
      type: 'npm',
      name: 'template-' + name
    })
  })

  it('parses npm template without template- prefix', () => {
    const name = 'find-it'
    const parsed = parse.npmPackage(name, {
      templatePrefix: false
    })
    expect(parsed).toBeTruthy()
    expect(parsed).toEqual({
      type: 'npm',
      name
    })
  })

  it('parses npm template with version and without template- prefix', () => {
    const name = 'find-it'
    const version = "1.0.1"
    const templateName = [name, version].join('@')
    const parsed = parse.npmPackage(templateName, {
      templatePrefix: false
    })
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
    const parsed = parse.npmPackage(template, options)
    expect(parsed).toBeFalsy()
  })
})
