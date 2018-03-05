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

/**
 * collect all template files from list of template file paths
 * @param templatePaths
 * @param options
 */
export async function collectTemplateFilesFrom(templatePaths: string[], options: any = {}) {
  let readDir = options.readDir || defaults.readDir
  validatePaths(templatePaths)
  const promises = templatePaths.map(async (templatePath) => {
    console.log('read', templatePath)
    const files = await readDir(templatePath)
    console.log({
      files
    })
    return files
  })
  return Promise.all(promises)
}
