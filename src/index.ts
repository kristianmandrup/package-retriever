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
  extendTemplateSrcWith
} from './extend'

export {
  fromExistingTemplate,
  fromLocal,
  fromRepo,
  fromNpm,
  shouldDownload
} from './download'

export {
  parse,
  parseUri,
  retrieveTemplates,
  postRetrieve,
  createConfig
}




