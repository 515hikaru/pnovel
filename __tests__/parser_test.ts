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
  は」  % あいさつつ

（どうか
な）

（どうだろう）

\`$  ふふふ &%\` 
ほげほげ

\`$  ふふふ &%\` ほげほげ

\`\`\`aa
aaaaa
hogefugabar
\`\`\`

\`\`\`aaa\`\`\`

\`\`\`
aaa\`\`\` bbb123

aa\`\`\`aaa123
\`\`\`

[chapter:foo]

[newpage]

hoge [newline] fuga [newline] bar [newline]
boo

[newline]

「あ！こんにちは」

「え？そうですか」

「あ!こんにちは」

「え?そうですか」

「あ!こんにちは!」

「え?そうですか?」

# 見出し
`
    const expected = {
      type: 'doc',
      contents: [
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'ａｂｃ' },
            { type: 'text', contents: 'ｄｅｆ' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'ａａａ' }
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
            { type: 'speechend', contents: 'は' },
            { type: 'comment', contents: 'あいさつつ' }
          ]
        },
        {
          type: 'thinking',
          contents: [
            { type: 'text', contents: 'どうか' },
            { type: 'thinkend', contents: 'な' }
          ]
        },
        {
          type: 'thinking',
          contents: [
            { type: 'thinkend', contents: 'どうだろう' }
          ]
        },

        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: '$  ふふふ &%' },
            { type: 'text', contents: 'ほげほげ' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: '$  ふふふ &%' },
            { type: 'text', contents: 'ほげほげ' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: 'aa\naaaaa\nhogefugabar' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: 'aaa' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: 'aaa' },
            { type: 'text', contents: 'ｂｂｂ１２３' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'ａａ' },
            { type: 'raw', contents: 'aaa123' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: '[chapter:foo]' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'raw', contents: '[newpage]' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'ｈｏｇｅ' },
            { type: 'break', contents: [] },
            { type: 'text', contents: 'ｆｕｇａ' },
            { type: 'break', contents: [] },
            { type: 'text', contents: 'ｂａｒ' },
            { type: 'break', contents: [] },
            { type: 'text', contents: 'ｂｏｏ' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'break', contents: [] }
          ]
        },
        {
          type: 'speaking',
          contents: [
            { type: 'speechend', contents: 'あ！　こんにちは' }
          ]
        },
        {
          type: 'speaking',
          contents: [
            { type: 'speechend', contents: 'え？　そうですか' }
          ]
        },
        {
          type: 'speaking',
          contents: [
            { type: 'speechend', contents: 'あ！　こんにちは' }
          ]
        },
        {
          type: 'speaking',
          contents: [
            { type: 'speechend', contents: 'え？　そうですか' }
          ]
        },
        {
          type: 'speaking',
          contents: [
            { type: 'speechend', contents: 'あ！　こんにちは！' }
          ]
        },
        {
          type: 'speaking',
          contents: [
            { type: 'speechend', contents: 'え？　そうですか？' }
          ]
        },
        {
          type: 'header',
          contents: [
            { type: 'text', contents: '見出し' }
          ]
        }
      ]
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
