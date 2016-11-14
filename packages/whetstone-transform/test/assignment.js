import test from 'ava'
import 'babel-register'
import { transform } from '../src'

test('numeric literal assignment value matches', t => {
  const script = "x = 3;"
  let result = transform(script)[0]

  t.is(result.value.raw, 3) 
})

test('string literal assignment value matches', t => {
  const script = "x = 'test';"
  let result = transform(script)[0]

  t.is(result.value.raw, 'test') 
})

test('boolean literal assignment value matches', t => {
  const script = "x = true;"
  let result = transform(script)[0]

  t.is(result.value.raw, true) 
})

test('null literal assignment value matches', t => {
  const script = "x = null;"
  let result = transform(script)[0]

  t.is(result.value.raw, null) 
})
