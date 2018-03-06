# Mock Git repo download

Will extract this into a small reusable library.
Could likely be done sth like this

```js
function configureMocks(options = {}) {
  const { mock } = options
  mock.gitRepoResponse && mock.gitRepoResponse(options)
  mock.fileSystem && mock.fileSystem(options.fs, options)
}

function gitRepoResponse(options = {}) {
   const { route, fixtures, gitBaseUrl } = options
    nock(gitBaseUrl)
      .persist()
      .get(route.userRepoName.invalid)
      .reply(404)
      .get(route.userRepoName.valid)
      .replyWithFile(200, fixtures.zipPath))
}
```

The download lib will normally extract the zip received from the remote repo into files on local disk.

Instead we could just mock the result via something like `mock-fs` so we don'r rely on either a connection or touch any files, in order to keep the test run totally clean.

```js
  import * as mockFs from 'mock-fs'

  const fs = {
    // files.zip
    'files': {
      'foo.txt': 'foo',
      'bar.txt': 'bar',
    }
  }

  const fileSystem = mockFs

  beforeAll(() => {
    const mock = {
      gitRepoResponse,
      fileSystem
    }

    configureMocks({
      mock,
      fs,
      route,
      fixtures,
      gitBaseUrl
    })
   })
```

Ideally it would "auto mock" using some of the same arguments passed to the main method, such as destination (`dest` ?) so that we mock files there after in the mocked FS after the fake download response.