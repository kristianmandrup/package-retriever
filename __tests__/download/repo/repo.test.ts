import {
  fromRepo
} from '../..'

describe('fromRepo', () => {
  const dest = ''
  const repo = {
    user: 'kristianmandrup',
    name: 'find-it',
    // version: 'master'
  }

  it('aborts when ...', () => {
    const pkg = fromRepo(repo, { dest })
    expect(pkg).toBeDefined()
  })

  it('retrieves from local cache', () => {
    const pkg = fromRepo(repo, { dest })
    expect(pkg).toBeDefined()
  })
})
