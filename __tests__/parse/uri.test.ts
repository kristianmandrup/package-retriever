import {
  parseUri
} from '..'

describe('parseUri', () => {
  describe('npm package', () => {

    it('parses npm template with template- prefix', () => {
      const name = 'find-it'
      const parsed = parseUri(name)
      expect(parsed).toBeTruthy()
      expect(parsed).toEqual({
        type: 'npm',
        name: 'template-' + name // templatePrefix: true by default
      })
    })

    it('parses npm template without template- prefix', () => {
      const name = 'find-it'
      const parsed = parseUri(name, {
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
      const parsed = parseUri(templateName, {
        templatePrefix: false
      })
      expect(parsed).toBeTruthy()
      expect(parsed).toEqual({
        type: 'npm',
        name,
        version
      })
    })
  })
})
