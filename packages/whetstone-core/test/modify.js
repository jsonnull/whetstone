import test from 'ava'
import 'babel-register'
import { modify } from '../src/index'

test('make modifications', t => {
  const script = 'let x = 3;'

  let x = {
    id: 'x',
    value: {
      raw: 3,
      loc: {
        start: { line: 1, column: 8 },
        end: { line: 1, column: 9 }
      }
    }
  }

  let newScript = modify(script, x, 4)

  t.is(newScript, 'let x = 4;')
})
