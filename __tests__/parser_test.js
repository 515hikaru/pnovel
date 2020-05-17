import { parse } from '../parser/parser'

describe('parser', () => {
  test('parse testing', () => {
    const input = `abc
def

  foo

# foo

　　boo
# foo
`
    const expected = {
      type: 'doc',
      contents: [
            { type: 'sentence', contents: 'abcdef'},
            { type: 'break'},
            { type: 'sentence', contents: 'foo'},
            { type: 'break'},
            { type: 'header', contents: 'foo'},
            { type: 'break'},
            { type: 'sentence', contents: 'boo# foo'},
          ],
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
