import {
  utils
} from '..'

describe('utils', () => {
  describe('ensureRepos', () => {
    it('works', () => {
      const options = {}

      const ensured = utils.ensureRepos(options)
      expect(ensured).toBeDefined()
    })
  })

  describe('ensurePackages', () => {
    it('works', () => {
      const options = {}

      const ensured = utils.ensurePackages(options)
      expect(ensured).toBeDefined()
    })
  })

  describe('getPackageTemplatePath', () => {
    it('works', () => {
      const options = {}
      const name = 'find-derived'

      const templatePath = utils.getPackageTemplatePath(name, options)
      expect(templatePath).toBeDefined()

    })
  })
  describe('createConfig', () => {
    it('works', () => {
      const options = {}

      const config = utils.createConfig(options)
      expect(config).toBeDefined()
    })
  })
  describe('collectTemplateFilesFrom', async () => {
    it('works', () => {
      const options = {}
      const templatePaths = [
        'my/templates',
        'my/other/templates'
      ]

      // use mockfs

      const files: string[] = await utils.collectTemplateFilesFrom(templatePaths, options)
      expect(files.length).toBeGreaterThan(0)
    })
  })

})
