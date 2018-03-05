import {
  utils
} from '..'

import * as mockFs from 'mock-fs'
describe('utils', () => {

  beforeAll(() => {
    // use mockfs
    mockFs({})
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

    it('fails when invalid reposDir is specified', async () => {
      const options = {
        reposDir: 42
      }
      try {
        await utils.ensureRepos(options)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })

  describe('ensurePackages', () => {
    it('works when valid packagesDir specified', async () => {
      const options = {
        packagesDir: 'my/sweet/packages'
      }

      const ensured = await utils.ensurePackages(options)
      expect(ensured).toBeDefined()
    })

    it('fails when invalid packagesDir is specified', async () => {
      const options = {
        packagesDir: 42
      }
      try {
        await utils.ensurePackages(options)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })
})
