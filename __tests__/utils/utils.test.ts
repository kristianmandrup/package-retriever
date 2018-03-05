import {
  utils
} from '..'
import * as path from 'path'
describe('utils', () => {

  describe('getPackageTemplatePath', () => {
    it('throws if packagesDir not a string', () => {
      // const packagesDir = 'my/packages'
      const options = {
        // packagesDir
      }
      const name = 'find-it'

      const runTemplatePath = () => utils.getPackageTemplatePath(name, options)
      expect(runTemplatePath).toThrow()
    })

    it('resolves to path under node_modules in packagesDir', () => {
      const packagesDir = 'x/y/z'
      const options = {
        packagesDir
      }
      const name = 'find-it'

      const templatePath = utils.getPackageTemplatePath(name, options)
      const expectedPath = path.join(packagesDir, 'node_modules', name)
      expect(templatePath).toBe(expectedPath)
    })
  })

  describe('createConfig', () => {
    it('loads defaults if no options', () => {
      const options = {}

      const config: any = utils.createConfig(options)
      expect(config.event).toBe(utils.defaults.event)
      expect(config.configDir).toBe(utils.defaults.configDir)
      expect(config.packagesDir).toMatch(/\.sao\/packages/)
      expect(config.reposDir).toMatch(/\.sao\/repos/)
    })

    it('replaces defaults if options provided', () => {
      const configDir = 'my/config'
      const event = {
        emit() { }
      }
      const options = {
        configDir,
        event
      }

      const config: any = utils.createConfig(options)
      expect(config.event).toBe(event)
      expect(config.configDir).toBe(configDir)
      expect(config.packagesDir).toMatch(/my\/config\/packages/)
      expect(config.reposDir).toMatch(/my\/config\/repos/)
    })
  })
})
