import {
  parseUri,
  parse
} from './parse'
import {
  retrieveTemplates
} from './download'
import {
  postRetrieve
} from './after'
import {
  createConfig
} from './utils'

export async function resolveTemplates(templateUri: string, options: any = {}) {
  options = createConfig(options)

  const parsed = parseUri(templateUri, options)
  await retrieveTemplates(parsed, options)
  await postRetrieve(parsed, options)
  return true
}

export {
  utils
} from './utils'

export {
  after
} from './after'

export {
  extendTemplateSrcWith
} from './extend'

export {
  fromExistingTemplate,
  fromLocal,
  fromRepo,
  fromNpm,
  shouldDownload,
  download
} from './download'

export {
  parse,
  parseUri,
  retrieveTemplates,
  postRetrieve,
  createConfig
}




