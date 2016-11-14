// @flow
import invariant from 'invariant'
import type { BabelNode } from './types'
import type { Range } from 'whetstone-core/src/types'

export function getLocation (node: BabelNode): Range {
  invariant(
    node.loc !== null,
    "Attempted to get source location from a node with no loc property" 
  )

  return Object.assign({}, node.loc)
}
