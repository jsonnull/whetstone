// @flow
import * as babylon from 'babylon'
import traverse from 'babel-traverse'
import * as t from 'babel-types'
import invariant from 'invariant'
import {
  fromDeclaration,
  fromAssignment
} from './reference'

// Return a variable declaration for a node if it is one
function getReferences (path) {
  if (t.isVariableDeclaration(path)) {
    return path.node.declarations.map(decl => fromDeclaration(decl))
  } else if (t.isAssignmentExpression(path)) {
    return [fromAssignment(path.node)];
  }
}

export function transform (script: string) {
  let declarations = []

  // Build the source AST
  const ast = babylon.parse(script, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'flow'
    ]
  })

  // Construct visitor which pushes declarations onto array 
  const visitor = {
    enter(path) {
      Array.prototype.push.apply(
        declarations,
        getReferences(path)
      )
    }
  }

  // Perform the AST traversal with the visitor struct
  traverse(ast, visitor)

  return declarations
}
