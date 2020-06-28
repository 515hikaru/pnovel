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

（うーん？こんにちは？）

（あ！そうだった！）

# 見出し

はぁ。「ちょっと待って
よ」と言った。

はぁ。
「ちょっと待ってよ」
と言った。

はぁ。
「ちょっと！待ってよ！」
と言った。

ああ。（なんだか
な）と思った。

ああ。
（なんだ？かな？）
と思った。

ああ。
（なんだかな）
と思った。
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
          type: 'thinking',
          contents: [
            { type: 'thinkend', contents: 'うーん？　こんにちは？' }
          ]
        },
        {
          type: 'thinking',
          contents: [
            { type: 'thinkend', contents: 'あ！　そうだった！' }
          ]
        },
        {
          type: 'header',
          contents: [
            { type: 'text', contents: '見出し' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'はぁ。「ちょっと待って' },
            { type: 'speechend', contents: 'よ' },
            { type: 'text', contents: 'と言った。' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'はぁ。' },
            { type: 'text', contents: '「ちょっと待ってよ」' },
            { type: 'text', contents: 'と言った。' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'はぁ。' },
            { type: 'text', contents: '「ちょっと！　待ってよ！」' },
            { type: 'text', contents: 'と言った。' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'ああ。（なんだか' },
            { type: 'thinkend', contents: 'な' },
            { type: 'text', contents: 'と思った。' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'ああ。' },
            { type: 'text', contents: '（なんだ？　かな？）' },
            { type: 'text', contents: 'と思った。' }
          ]
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'ああ。' },
            { type: 'text', contents: '（なんだかな）' },
            { type: 'text', contents: 'と思った。' }
          ]
        }
      ]
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
