// @flow
import invariant from 'invariant'
import splitLines from 'split-lines'
import type { Reference, Value } from './types'

export function modify (script: string, ref: Reference, newValue: any): string {
  // If there's no current value, do not perform a modification
  let value = ref.value
  if (value == null) {
    return script
  }

  let lines = splitLines(script, { preserveNewlines: true })

  invariant(
    value.loc.start.line == value.loc.end.line,
    "Cannot modify multi-line value."
  )

  let line = value.loc.start.line - 1
  let start = value.loc.start.column
  let end = value.loc.end.column
  
  invariant(
    start < end,
    "Cannot modify range where start column is greater than or equal to end column."
  )

  let newValueString = JSON.stringify(newValue)
  let newLine = lines[line].slice(0, start) + newValueString + lines[line].slice(end)
  
  lines[line] = newLine

  return lines.join('')
}
