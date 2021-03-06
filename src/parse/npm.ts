const ensurePackageName = (name: string) => name.replace(/^(template-)?/, 'template-')

import {
  parseUri,
  IParseResult
} from '.'

// Explict npm name
export function explicitNpm(template: string, options?: any): IParseResult | false {
  if (!template.startsWith('npm:')) return false
  return parseUri(template.replace(/^npm:/, ''), false)
}

// npm package
export function npmPackage(template: string, options: any = {}): IParseResult | false {
  const {
    templatePrefix
  } = options
  if (/\//.test(template)) return false
  const matches = /([^@]+)(?:@(.+))?$/.exec(template)
  if (!matches) return {
    type: 'invalid'
  }
  const [, name, version] = matches

  const npmDef: any = {
    type: 'npm',
    name: templatePrefix ? ensurePackageName(name) : name,

  }
  if (version) {
    npmDef.version = version
  }
  return npmDef
}

// npm scoped package
export function npmScopedPackage(template: string, options: any = {}): IParseResult | false {
  const {
    templatePrefix
  } = options
  if (!template.startsWith('@')) return false
  const matches = /^@([^/]+)\/([^@]+)(?:@(.+))?$/.exec(
    template
  )
  if (!matches) return {
    type: 'invalid'
  }
  const [, user, name, version] = matches
  return {
    type: 'npm',
    scoped: true,
    user,
    name: templatePrefix ? ensurePackageName(name) : name,
    version
  }
}
