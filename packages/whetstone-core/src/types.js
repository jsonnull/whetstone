// @flow
export type Position = {
  line: number,
  column: number
}

export type Range = {
  start: Position,
  end: Position
}

export type Value = {
  raw: any,
  loc: Range
}

export type Reference = {
  id: string,
  value: null | Value
}
