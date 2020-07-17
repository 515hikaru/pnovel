import { transform } from '../main'

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

# 見出し

はぁ。「ちょっと待って
よ」と言った。

心の中では（うん？なんだかな？）と思い
ながらも、ついていくしかなかった。

あー！!!!??

あああ

[newline]

あああ

あああ\`あああ　\`

[newpage]

[[rb:漢字 > ふりがな]]
と書くとルビがふれる。

% コメント

あああ % コメント


あいうえお

\`ざあ　　ざ　　あ！あ\`
`
    const expected = `　ａｂｃｄｅｆ
　ａａａ
　こんにちは。こんばんは
「こんにちは」
[chapter:見出し]
　はぁ。「ちょっと待ってよ」と言った。
　心の中では（うん？　なんだかな？）と思いながらも、ついていくしかなかった。
　あー！！！！？？
　あああ

　あああ
　ああああああ
[newpage]
　[[rb:漢字 > ふりがな]]と書くとルビがふれる。
　あああ
　あいうえお
ざあ　　ざ　　あ！あ
`
    const result = transform(text)
    expect(result).toBe(expected)
  })
})
