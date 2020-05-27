// @ts-ignore
import { parse } from '../parser/parser'

describe('parser', () => {
  test('parse testing', () => {
    const input = `abc
def

  foo

# foo

　　boo
# foo

「あああ!」

「ああああ?
あああ」

「あああ？
　 」

        

「あっ！　田中さん!」


% コメント
（心の声）

（心！の声！）

（心？の声？）
`
    const expected = {
      type: 'doc',
      contents: [
            { type: 'sentence', contents: 'ａｂｃｄｅｆ'},
            { type: 'break'},
            { type: 'sentence', contents: 'ｆｏｏ'},
            { type: 'break'},
            { type: 'header', contents: 'ｆｏｏ'},
            { type: 'break'},
            { type: 'sentence', contents: 'ｂｏｏ# ｆｏｏ'},
            { type: 'break' },
            { type: 'speaking', contents: '「あああ！」' },
            { type: 'break' },
            { type: 'speaking', contents: '「ああああ？　あああ」'},
            { type: 'break'},
            { type: 'speaking', contents: '「あああ？」'},
            { type: 'break' },
            { type: 'speaking', contents: '「あっ！　田中さん！」' },
            { type: 'break' },
            { type: 'comment', contents: 'コメント'},
            { type: 'speaking', contents: '（心の声）'},
            { type: 'break' },
            { type: 'speaking', contents: '（心！　の声！）' },
            { type: 'break' },
            { type: 'speaking', contents: '（心？　の声？）' },
          ],
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
