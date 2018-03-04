import {
  parse
} from '..'

// extend(mainSrc: ITemplateSrc, extendSrc: ITemplateSrc, options: any = {})
describe('extend', () => {
  it('parses repo template', () => {
    const repo = {
      user: 'kristianmandrup',
      name: 'find-derived',
      // version: 'master'
    }
    const template = `${repo.user}/${repo.name}`
    const options = {}
    const parsed = parse.gitRepo(template, options)
    expect(parsed).toBeTruthy()
    expect(parsed).toEqual(repo)
  })

  it('parses repo template with version', () => {
    const repo = {
      user: 'kristianmandrup',
      name: 'find-derived',
      version: 'master'
    }
    const template = `${repo.user}/${repo.name}#${repo.version}`
    const options = {}
    const parsed = parse.gitRepo(template, options)
    expect(parsed).toBeTruthy()
    expect(parsed).toEqual(repo)
  })

  it('aborts on non repo template', () => {
    const template = 'kristianmandrup@find-derived'
    const options = {}
    const parsed = parse.gitRepo(template, options)
    expect(parsed).toBeFalsy()
  })
})
