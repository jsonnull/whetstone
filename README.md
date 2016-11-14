# whetstone 

Create dynamic interfaces to interact with JavaScript source code.

```js
import { modify } from 'whetstone-core'
import { transform } from 'whetstone-transform'

let script = "let x = 3;" 
let references = transform(script)
let xDecl = references.find(ref => ref.id == 'x')
let newScript = modify(script, xDecl, xDecl.value.raw + 1)

console.log(newScript) // "let x = 4;"
```

## Goals

Whetstone is aimed at letting developers write tools to make development
interactive. Much of development revolves around editing files and maintaining
a constant mapping of source to result. With Whetstone you can write tools to
interact with the meaningful values from source code where they are actually
used.

**Example use case:** To make an interactive front-end JavaScript project:
expose JSX attributes from React components, pair with live reloading to make
changes instantaneous, and persist results to your codebase.

## Packages

Whetstone's core revolves around References (pointers to values in source code)
and the `modify` function exported by
[whetstone-core](/packages/whestone-core).

To generate References, use
[whetstone-transform](/packages/whetstone-transform), which uses Babel under
the hood and will respect existing Babel configurations.

To generate References automatically for a number of files, there is a Gulp
plugin, [gulp-whetstone](/packages/gulp-whetstone), to automate generation of
References for files. These are exported as JSON files, so you can generate
them alongside existing source code.

If you want Flow type definitions or you're creating your own Whetstone
exporters, you can depend on [whetstone-core](/packages/whetstone-core).

## Development

Whetstone is organized as a monorepo and uses Lerna to alleviate the pains of
managing multiple packages. Refer to the scripts in `package.json` for how to
perform common tasks.

```sh
$ npm run bootstrap # Install all dependencies
$ npm run build # Build each package
$ npm run test # Run tests for all packages
$ npm run example # Build and run the example script
```

If you make a change in a module, the tests will run off of the source
directory; but if you make a change to an internal dependency, you must run the
build in order for its dependents to run the latest code.

For example, if you make a change in `whetstone-transform` and run the tests,
the tests will show the change. However, if you make a change in
`whetstone-core`, which `whetstone-transform` depends on, you'll have to run
the build in order for `whetstone-transform` to run the latest version of
`whetstone-core`.
