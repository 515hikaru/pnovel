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
            { type: 'paragraph', contents: 'abcdef'},
            { type: 'paragraph', contents: 'foo'},
            { type: 'header', contents: 'foo'},
            { type: 'paragraph', contents: 'boo# foo'},
          ],
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
