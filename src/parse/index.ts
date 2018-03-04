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
  firstValue
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

export function parseUri(templateUri: string, templatePrefix = true): IParseResult {
  // From SAO: https://github.com/saojs/sao/blob/master/lib/utils/parse-template.js
  const opts = {
    templatePrefix
  }
  return firstValue(strategies, (fn: Function) => fn(templateUri, opts)) || defaultParsed
}

