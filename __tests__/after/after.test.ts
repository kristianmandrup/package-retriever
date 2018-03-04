import {
  after
} from '..'

describe('after', () => {
  describe('updateNotify', () => {
    it('works', () => {
      const pkg = {

      }
      const result = after.updateNotify(pkg)
      expect(result).toBeDefined()
    })
  })

  describe('postRetrieve', () => {
    it('works', () => {
      const parsed = {
        type: 'npm',
        user: 'kmandrup',
        name: 'hello'
      }
      const options = {

      }
      const result = after.postRetrieve(parsed, options)
      expect(result).toBeDefined()
    })
  })

})
