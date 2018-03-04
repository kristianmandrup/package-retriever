import * as fs from 'fs-extra'
import * as tildify from 'tildify'
import * as chalk from 'chalk'
import * as update from 'update-notifier'
import * as boxen from 'boxen'

import {
  IParseResult
} from '../parse'

export function updateNotify(pkg: any) {
  const notifier = update({
    pkg
  })
  if (notifier.update) {
    process.on('exit', () => {
      console.log(
        boxen(
          'Template update available ' +
          chalk.dim(notifier.update.current) +
          chalk.reset(' → ') +
          chalk.green(notifier.update.latest) +
          ' \nRun template with ' +
          chalk.cyan('--update') +
          ' flag to update'
        )
      )
    })
  }
}


export async function postRetrieve(parsed: IParseResult, options: any) {
  const {
    dest,
    templatePkg,
    updateNotify
  } = options

  const destExists = await fs.pathExists(dest)
  if (!destExists) {
    throw new Error(`template was not found at ${tildify(dest)}`)
  }

  // Notify new package available
  if (parsed.type === 'npm' && updateNotify) {
    // Run update notifier for package template
    updateNotify(templatePkg)
  }

  const templateVersion = templatePkg ?
    templatePkg.version :
    parsed.version || ''

  return {
    templateVersion,
    templatePkg,
    dest
  }
}
