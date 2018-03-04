import { IParseResult } from '../parse'
import {
  fromLocal
} from './local'
import {
  fromRepo
} from './repo'
import {
  fromNpm
} from './npm'
import {
  shouldDownload
} from './should-download'

import {
  findDerived
} from 'find-derived'

import {
  fromExistingTemplate
} from './existing'

export const download = {
  fromLocal,
  fromRepo,
  fromNpm,
  shouldDownload,
  fromExistingTemplate
}

export {
  fromLocal,
  fromRepo,
  fromNpm,
  shouldDownload,
  fromExistingTemplate
}

const defaults = {
  strategies: [
    fromLocal,
    fromRepo,
    fromNpm,
  ]
}

export async function retrieveTemplates(parsed: IParseResult, options: any = {}) {
  let {
    dest,
    error,
    update,
    clone,
    forceNpm,
    strategies
  } = options

  strategies = strategies || defaults.strategies

  const {
    mustDownload,
    exists
  } = await shouldDownload({
      parsed,
      dest
    })

  const opts = {
    mustDownload,
    exists,
    update,
    clone,
    forceNpm
  }

  return findDerived(strategies, (fn: Function) => fn(parsed, opts)) || error('Could not retrieve templates', {
    parsed,
    opts
  })
}
