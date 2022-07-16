import * as fs from "fs"
import * as path from "path"

import mockArgv from "mock-argv"

import { transform, main } from "../main"

describe("test main", () => {
  test("main", () => {
    mockArgv(["testdata/sample.pnovel", "-o", "output.txt"], async() => {
      main()
    })
    const filePath = path.resolve("output.txt")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const expected = "　あ\n"
    expect(fileContent).toBe(expected)
  })
})

describe("test parsing", () => {
  test("normal parsing", () => {
    const text = "foo\n"
    const expected = "　ｆｏｏ\n"
    const result = transform(text, "pixiv")
    expect(result).toBe(expected)
  })

  test("do not have last newline", () => {
    const text = "foo"
    const expected = "　ｆｏｏ\n"
    const result = transform(text, "pixiv")
    expect(result).toBe(expected)
  })

  test("only sharp symbol line", () => {
    const text = "#"
    const expected = "　#\n"
    const result = transform(text, "pixiv")
    expect(result).toBe(expected)
  })

  test("raw block", () => {
    const text1 = `\`\`\`あああ
あああ
あああ\`\`\`
`
    const text2 = `\`\`\`
あああ
あああ
あああ
\`\`\``
    const expected = `あああ
あああ
あああ\n`
    const result1 = transform(text1, "pixiv")
    const result2 = transform(text2, "pixiv")
    expect(result1).toBe(expected)
    expect(result2).toBe(expected)
  })

  test("using sample string for testing parser", () => {
    const text = `abc
def

    aaa

こんにちは。 % こんにちは
こんばんは

「こんにちは」  % あいさつ

# 見出し

# み\`　\`だ\` \`し

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

% コメント
「あああ」

% コメントセカンドシーズン
（あああ）
`
    const expected = `　ａｂｃｄｅｆ
　ａａａ
　こんにちは。こんばんは
「こんにちは」
[chapter:見出し]
[chapter:み　だ し]
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
「あああ」
（あああ）
`
    const result = transform(text, "pixiv")
    expect(result).toBe(expected)
  })

  test("pixiv ruby", () => {
    const text = "こんにちは、|こんにちは< こんにちは>、こんにちは"
    const expected = "　こんにちは、[[rb:こんにちは > こんにちは]]、こんにちは\n"
    const result = transform(text, "pixiv")
    expect(result).toBe(expected)
  })

  test("narou toransformer", () => {
    const text = "# foo\n"
    const expected = "\nｆｏｏ\n\n"
    const result = transform(text, "narou")
    expect(result).toBe(expected)
  })

  test("narou ruby", () => {
    const text = "こんにちは、|こんにちは<こんにちは>、こんにちは"
    const expected = "　こんにちは、|こんにちは《こんにちは》、こんにちは\n"
    const result = transform(text, "narou")
    expect(result).toBe(expected)
  })

  test("narou toransformer: ignore pixivToken", () => {
    const text = "[newpage]"
    const expected = "\n"
    const result = transform(text, "narou")
    expect(result).toBe(expected)
  })

  test("narou transformer document", () => {
    const text = `abc
def

    aaa

こんにちは。 % こんにちは
こんばんは

「こんにちは」  % あいさつ

# 見出し

# み\`　\`だ\` \`し

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

% コメント
「あああ」

% コメントセカンドシーズン
（あああ）
`
    const expected = `　ａｂｃｄｅｆ
　ａａａ
　こんにちは。こんばんは
「こんにちは」

見出し


み　だ し

　はぁ。「ちょっと待ってよ」と言った。
　心の中では（うん？　なんだかな？）と思いながらも、ついていくしかなかった。
　あー！！！！？？
　あああ

　あああ
　ああああああ

　[[rb:漢字 > ふりがな]]と書くとルビがふれる。
　あああ
　あいうえお
ざあ　　ざ　　あ！あ
「あああ」
（あああ）
`
    const result = transform(text, "narou")
    expect(result).toBe(expected)
  })
})
