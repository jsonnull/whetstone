// @flow
import { create as createRef } from 'whetstone-core/lib/reference'
import { getLocation } from './location'
import * as t from 'babel-types'

import type { Reference } from 'whetstone-core/src/types'

export function fromDeclaration (node: Object): Reference {
  let id = node.id.name

  let value = null

  if (node.init !== null) {
    let raw = node.init.value
    let loc = getLocation(node.init)

    value = { raw, loc }
  }

  return { id, value }
}

export function fromAssignment (node: Object): Reference {
  let id = node.left
  if (t.isIdentifier(node.left)) {
    id = node.left.name
  }

  let value = null
  if (node.right) {
    let raw = undefined
    let loc = getLocation(node.right)

    switch (true) {
      case t.isNumericLiteral(node.right):
      case t.isStringLiteral(node.right):
      case t.isBooleanLiteral(node.right):
        raw = node.right.value
        break
      case t.isNullLiteral(node.right):
        raw = null
        break
      default:
        break
    }

    value = { raw, loc }
  }

  return { id, value }
}
