import test from 'ava'
import 'babel-register'
import { transform } from '../src'

test('supports variable declaration', t => {
  const script = "let x = 3;"
  let result = transform(script)

  t.is(result.length, 1) 
})

test('supports assignment pattern', t => {
  const script = "x = 3;"
  let result = transform(script)

  t.is(result.length, 1) 
})
