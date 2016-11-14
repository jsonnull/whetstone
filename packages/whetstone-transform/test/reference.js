import test from 'ava'
import 'babel-register'
import { transform } from '../src'

test('result has id', t => {
  const script = "let x = 3;"
  let result = transform(script)[0]
  let id = "x";

  t.is(result.id, id) 
})

test('result.value is null when uninitialized', t => {
  const script = "let x;"
  let result = transform(script)[0]

  t.is(result.value, null) 
})

test('result.value matches value when initialized', t => {
  const script = "let x = 3;"
  let result = transform(script)[0]

  t.is(result.value.raw, 3) 
})

test('result.value.location matches source location', t => {
  const script = "let x = 3;"
  let result = transform(script)[0]

  let loc = {
    start: {
      line: 1,
      column: 8
    },
    end: {
      line: 1,
      column: 9
    },
  }

  t.deepEqual(result.value.loc, loc) 
})
