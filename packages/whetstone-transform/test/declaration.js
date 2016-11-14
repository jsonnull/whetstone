import test from 'ava'
import 'babel-register'
import { transform } from '../src'

test('let declaration value matches', t => {
  const script = "let x = 3;"
  let result = transform(script)[0]

  t.is(result.value.raw, 3) 
})

test('var declaration value matches', t => {
  const script = "var x = 3;"
  let result = transform(script)[0]

  t.is(result.value.raw, 3) 
})

test('const declaration value matches', t => {
  const script = "const x = 3;"
  let result = transform(script)[0]

  t.is(result.value.raw, 3) 
})
