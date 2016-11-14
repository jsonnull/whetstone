// @flow
import type { Range } from 'whetstone-core/src/types'

export type BabelNode = {
  type: string,
  start: ?number,
  end: number,
  loc: Range
}
