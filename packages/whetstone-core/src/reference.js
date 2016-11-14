// @flow
import invariant from 'invariant'
import type { Value, Reference } from './types'

export function create (id: string, value: Value): Reference {
  invariant(
    value.hasOwnProperty('raw'),
    "Cannot create Whetstone reference without `raw` property on the value." 
  )

  invariant(
    value.hasOwnProperty('loc'),
    "Cannot create Whetstone reference without `loc` property on the value." 
  )

  invariant(
    value.loc.start && value.loc.end
      && typeof value.loc.start.line == 'number'
      && typeof value.loc.start.col == 'number'
      && typeof value.loc.end.line == 'number'
      && typeof value.loc.end.col == 'number',
    "Cannot create Whetstone reference without valid `loc` definition."
  )

  return {
    id,
    value
  }
}
