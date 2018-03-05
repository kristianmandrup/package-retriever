import {
  utils
} from '..'

import * as mockFs from 'mock-fs'

describe('utils', () => {
  describe('ensureRepos', () => {
    it('works when a valid reposDir is specified', () => {
      const options = {
        reposDir: 'a/b'
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
    it('works', () => {
      const options = {}

      const ensured = utils.ensurePackages(options)
      expect(ensured).toBeDefined()
    })
  })

  describe('getPackageTemplatePath', () => {
    it('throws if packagesDir not a string', () => {
      const options = {}
      const name = 'find-derived'

      const runTemplatePath = () => utils.getPackageTemplatePath(name, options)
      expect(runTemplatePath).toThrow()
    })

    it('works', () => {
      const options = {
        packagesDir: 'x/y/z'
      }
      const name = 'find-derived'

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
