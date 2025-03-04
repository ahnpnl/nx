# jest

Run Jest unit tests

## Properties

### bail

Alias(es): b

Type: `number`

Exit the test suite immediately after `n` number of failing tests. (https://jestjs.io/docs/en/cli#bail)

### ci

Type: `boolean`

Whether to run Jest in continuous integration (CI) mode. This option is on by default in most popular CI environments. It will prevent snapshots from being written unless explicitly requested. (https://jestjs.io/docs/en/cli#ci)

### clearCache

Type: `boolean`

Deletes the Jest cache directory and then exits without running tests. Will delete Jest's default cache directory. _Note: clearing the cache will reduce performance_.

### codeCoverage

Type: `boolean`

Indicates that test coverage information should be collected and reported in the output. (https://jestjs.io/docs/en/cli#coverage)

### color

Alias(es): colors

Type: `boolean`

Forces test results output color highlighting (even if stdout is not a TTY). Set to false if you would like to have no colors. (https://jestjs.io/docs/en/cli#colors)

### colors

Type: `boolean`

Forces test results output highlighting even if stdout is not a TTY. (https://jestjs.io/docs/en/cli#colors)

### coverage

Type: `boolean`

Indicates that test coverage information should be collected and reported in the output. This option is also aliased by --collectCoverage. (https://jestjs.io/docs/en/cli#coverage)

### coverageDirectory

Type: `string`

An array of regexp pattern strings that are matched against all file paths before executing the test. If the file path matches any of the patterns, coverage information will be skipped.

### coverageReporters

Type: `string`

A list of reporter names that Jest uses when writing coverage reports. Any istanbul reporter

### findRelatedTests

Type: `string`

Find and run the tests that cover a comma separated list of source files that were passed in as arguments. (https://jestjs.io/docs/en/cli#findrelatedtests-spaceseparatedlistofsourcefiles)

### jestConfig

Type: `string`

The path of the Jest configuration. (https://jestjs.io/docs/en/configuration)

### json

Type: `boolean`

Prints the test results in JSON. This mode will send all other test output and user messages to stderr. (https://jestjs.io/docs/en/cli#json)

### maxWorkers

Alias(es): w

Type: `number`

Specifies the maximum number of workers the worker-pool will spawn for running tests. This defaults to the number of the cores available on your machine. Useful for CI. (its usually best not to override this default) (https://jestjs.io/docs/en/cli#maxworkers-num)

### onlyChanged

Alias(es): o

Type: `boolean`

Attempts to identify which tests to run based on which files have changed in the current repository. Only works if you're running tests in a git or hg repository at the moment. (https://jestjs.io/docs/en/cli#onlychanged)

### outputFile

Type: `string`

Write test results to a file when the --json option is also specified. (https://jestjs.io/docs/en/cli#outputfile-filename)

### passWithNoTests

Type: `boolean`

Will not fail if no tests are found (for example while using `--testPathPattern`.) (https://jestjs.io/docs/en/cli#passwithnotests)

### reporters

Type: `string`

Run tests with specified reporters. Reporter options are not available via CLI. Example with multiple reporters: jest --reporters="default" --reporters="jest-junit" (https://jestjs.io/docs/en/cli#reporters)

### runInBand

Alias(es): i

Type: `boolean`

Run all tests serially in the current process (rather than creating a worker pool of child processes that run tests). This is sometimes useful for debugging, but such use cases are pretty rare. Useful for CI. (https://jestjs.io/docs/en/cli#runinband)

### setupFile

Type: `string`

The name of a setup file used by Jest. (https://jestjs.io/docs/en/configuration#setupfilesafterenv-array)

### silent

Type: `boolean`

Prevent tests from printing messages through the console. (https://jestjs.io/docs/en/cli#silent)

### testFile

Type: `string`

The name of the file to test.

### testNamePattern

Alias(es): t

Type: `string`

Run only tests with a name that matches the regex pattern. (https://jestjs.io/docs/en/cli#testnamepattern-regex)

### testPathPattern

Type: `string`

A regexp pattern string that is matched against all tests paths before executing the test. (https://jestjs.io/docs/en/cli#testpathpattern-regex)

### tsConfig

Type: `string`

The name of the Typescript configuration file.

### updateSnapshot

Alias(es): u

Type: `boolean`

Use this flag to re-record snapshots. Can be used together with a test suite pattern or with `--testNamePattern` to re-record snapshot for test matching the pattern. (https://jestjs.io/docs/en/cli#updatesnapshot)

### useStderr

Type: `boolean`

Divert all output to stderr.

### verbose

Type: `string`

Display individual test results with the test suite hierarchy. (https://jestjs.io/docs/en/cli#verbose)

### watch

Type: `boolean`

Watch files for changes and rerun tests related to changed files. If you want to re-run all tests when a file has changed, use the `--watchAll` option. (https://jestjs.io/docs/en/cli#watch)

### watchAll

Type: `boolean`

Watch files for changes and rerun all tests when something changes. If you want to re-run only the tests that depend on the changed files, use the `--watch` option. (https://jestjs.io/docs/en/cli#watchall)
