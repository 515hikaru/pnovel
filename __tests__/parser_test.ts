// @ts-ignore
import { parse } from '../parser/parser'

describe('parser', () => {
  test('parse testing', () => {
    const input = `abc
def

   aaa

こんにちは % こんにちは
こんばんは

「こんにちは」  % あいさつ

「こんにち
は」

\`$  ふふふ &%\` 
ほげほげ

\`$  ふふふ &%\` ほげほげ

\`\`\`aa
aaaaa
hogefugabar
\`\`\`

\`\`\`aaa\`\`\`

\`\`\`
aaa\`\`\` bbb

aa\`\`\`aaa
\`\`\`
`
    const expected = {
      type: 'doc',
      contents: [
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'abc' },
            { type: 'text', contents: 'def' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'aaa' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'こんにちは' },
            { type: 'comment', contents: 'こんにちは' },
            { type: 'text', contents: 'こんばんは' }
          ]
        },
        {
          type: 'speaking',
          contents: [
            { type: 'speechend', contents: 'こんにちは' },
            { type: 'comment', contents: 'あいさつ' }
          ]
        },
        {
          type: 'speaking',
          contents: [
            { type: 'text', contents: 'こんにち' },
            { type: 'speechend', contents: 'は' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: '$  ふふふ &%'},
            { type: 'text', contents: 'ほげほげ'}
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: '$  ふふふ &%'},
            { type: 'text', contents: 'ほげほげ'}
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: 'aa\naaaaa\nhogefugabar'}
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: 'aaa'}
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: 'aaa'},
            { type: 'text', contents: 'bbb'},
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'aa'},
            { type: 'raw', contents: 'aaa'}
          ]
        },

      ]
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
