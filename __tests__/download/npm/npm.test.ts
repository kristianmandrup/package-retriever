import {
  npm
} from '../..'
import { EventEmitter } from 'events';

describe('download', () => {
  const dest = 'my-npm/packages'
  const pkgPath = dest
  const name = 'find-derived'
  const packageName = name
  const event = new EventEmitter()

  describe('tryFromNpm', () => {

    it('aborts when not an npm def', async () => {
      const parsed = {
        type: 'repo',
        user: 'kristianmandrup',
        name
      }
      const options = {
        dest,
        pkgPath
      }
      const result = await npm.tryFromNpm(parsed, options)
      expect(result).toBeFalsy()
    })

    it('retrieves package from npm', async () => {
      const parsed = {
        type: 'npm',
        name
      }
      const options = {
        dest,
        pkgPath
      }
      const result = await npm.tryFromNpm(parsed, options)
      expect(result).toBeTruthy()
    })

  })

  describe('fromNpm', () => {
    const packageName = 'abc'

    it('aborts when not an npm def', () => {
      const options = {
        dest,
        pkgPath
      }
      const pkg = npm.fromNpm(packageName, options)
      expect(pkg).toBeDefined()
    })

    it('retrieves package from npm', () => {
      const pkg = npm.fromNpm(packageName, { dest })
      expect(pkg).toBeDefined()
    })
  })

  describe('downloadFromNpm', () => {
    // packageName,
    // version,
    // log,
    // dest,
    // forceNpm,
    // exists,
    // packagesDir,
    // event,
    it('exists true: retrieves package from cache', async () => {
      const forceNpm = false
      const exists = true
      const packagesDir = dest

      const options = {
        dest,
        packageName,
        forceNpm,
        exists,
        packagesDir,
        event
      }
      const result = await npm.downloadFromNpm(options)
      expect(result).toBeTruthy()
    })

    it('retrieves package from npm', async () => {
      const forceNpm = true
      const exists = false
      const packagesDir = dest

      const options = {
        dest,
        packageName,
        forceNpm,
        exists,
        packagesDir,
        event
      }
      const result = await npm.downloadFromNpm(options)
      expect(result).toBeTruthy()
    })
  })
})
