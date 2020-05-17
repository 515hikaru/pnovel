import { parse } from '../parser/parser'

describe('parser', () => {
  test('parse testing', () => {
    const input = `foo
bar


boo
`
    const expected = {
      type: 'doc',
      contents: [
        {
          type: 'paragraph',
          contents: [
            [{ type: 'chars', contents: 'foo' }],
            [{ type: 'chars', contents: 'bar' }]
          ]
        },
        {type: 'break'},
        {
          type: 'paragraph',
          contents: [
            [{ type: 'chars', contents: 'boo' }]
          ]
        },
      ]
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
