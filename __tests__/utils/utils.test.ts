import {
  utils
} from '..'

import * as mockFs from 'mock-fs'

describe('utils', () => {
  const fileStruct = {
    'my': {
      'repos': {
        'a': `a`,
        'b': `b`
      },
      'sweet': {
        'packages': {
          'a': `a`,
          'd': `d`
        },
      }
    }
  }

  beforeEach(() => {
    // use mockfs
    mockFs(fileStruct)
  })

  afterAll(() => {
    mockFs.restore()
  })

  describe('ensureRepos', () => {
    it('works when a valid reposDir is specified', () => {
      const options = {
        reposDir: 'my/repos'
      }

      const ensured = utils.ensureRepos(options)
      expect(ensured).toBeDefined()
    })

    it('fails when invalid reposDir is specified', () => {
      const options = {
        reposDir: 42
      }
      const ensure = () => utils.ensureRepos(options)
      expect(ensure).toThrow()
    })
  })

  describe('ensurePackages', () => {
    it('works when valid packagesDir specified', () => {
      const options = {
        packagesDir: 'my/sweet/packages'
      }

      const ensured = utils.ensurePackages(options)
      expect(ensured).toBeDefined()
    })

    it('fails when invalid packagesDir is specified', () => {
      const options = {
        packagesDir: 42
      }
      const ensure = () => utils.ensurePackages(options)
      expect(ensure).toThrow()
    })
  })

  describe('getPackageTemplatePath', () => {
    it('throws if packagesDir not a string', () => {
      const options = {}
      const name = 'find-it'

      const runTemplatePath = () => utils.getPackageTemplatePath(name, options)
      expect(runTemplatePath).toThrow()
    })

    it('works', () => {
      const options = {
        packagesDir: 'x/y/z'
      }
      const name = 'find-it'

      const templatePath = utils.getPackageTemplatePath(name, options)
      console.log({
        templatePath
      })
      expect(templatePath).toBeDefined()

    })
  })

  describe.only('createConfig', () => {
    it('works', () => {
      const options = {}

      const config = utils.createConfig(options)
      expect(config).toBeDefined()
    })
  })
})
