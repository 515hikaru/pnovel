import { parse } from '../parser/parser'

describe('parser', () => {
  test('parse testing', () => {
    const input = 'foo'
    const expected = {
      type: 'doc',
      contents: [
        {
          type: 'paragraph',
          contents: [
            [{ type: 'chars', contents: 'foo' }]]
        }
      ]
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
