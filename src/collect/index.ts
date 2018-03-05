import * as readDirCb from 'recursive-readdir'
import {
  promisify
} from 'util'

const recursiveReadDir = promisify(readDirCb);

const defaults = {
  readDir: recursiveReadDir,
}

import {
  validatePath
} from '../utils'

function validatePaths(templatePaths: string[]) {
  templatePaths.map(tmplPath => validatePath(tmplPath, 'templatePaths'))
}

// Object.defineProperties(Array.prototype, {
//   'flatMap': {
//     value: function (lambda: Function) {
//       return Array.prototype.concat.apply([], this.map(lambda));
//     },
//     writeable: false,
//     enumerable: false
//   }
// });


/**
 * collect all template files from list of template file paths
 * @param templatePaths
 * @param options
 */
export async function collectTemplateFilesFrom(templatePaths: string[], options: any = {}) {
  const readDir = options.readDir || defaults.readDir
  validatePaths(templatePaths)
  return Promise.all(templatePaths.map(async (templatePath: string) => await readDir(templatePath)))
}

export function flatMap<T, U>(array: T[], mapFunc: (x: T) => U[]): U[] {
  return array.reduce((cumulus: U[], next: T) => [...mapFunc(next), ...cumulus], <U[]>[]);
}

function flatten(lists: Array<any>[]) {
  return lists.reduce((acc, list) => {
    return acc.concat(list)
  }, [])
}

export async function flatTemplateFilesFrom(templatePaths: string[], options: any = {}) {
  const filesLists = await collectTemplateFilesFrom(templatePaths, options)
  return flatten(filesLists)
}

