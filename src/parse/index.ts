export interface IParseResult {
  type: string
  name?: string
  path?: string
  user?: string
  scoped?: boolean
  version?: string
}

import {
  explicitNpm,
  npmPackage,
  npmScopedPackage
} from './npm'

import {
  gitRepo
} from './git-repo'

import {
  local
} from './local'

export const parse = {
  gitRepo,
  local,
  explicitNpm,
  npmPackage,
  npmScopedPackage
}


import {
  findDerived
} from 'find-derived'

const defaultParsed = {
  type: 'unknown'
}

const strategies = [
  local,
  explicitNpm,
  npmPackage,
  npmScopedPackage,
  gitRepo
]

// See SAO: https://github.com/saojs/sao/blob/master/lib/utils/parse-template.js
export function parseUri(templateUri: string, options: any = { templatePrefix: true }): IParseResult {
  return findDerived(strategies, (fn: Function) => fn(templateUri, options)) || defaultParsed
}

