import { transform } from '../src/main'

describe('test parsing', () => {
  test('normal parsing', () => {
    const text = 'foo\n'
    const expected = '　ｆｏｏ\n'
    const result = transform(text)
    expect(result).toBe(expected)
  })

  test('do not have last newline', () => {
    const text = 'foo'
    const expected = '　ｆｏｏ\n'
    const result = transform(text)
    expect(result).toBe(expected)
  })

  test('using sample string for testing parser', () => {
    const text = `abc
def

    aaa

こんにちは。 % こんにちは
こんばんは

「こんにちは」  % あいさつ
`
    const expected = `　ａｂｃｄｅｆ
　ａａａ
　こんにちは。こんばんは
「こんにちは」
`
    const result = transform(text)
    expect(result).toBe(expected)
  })
})
