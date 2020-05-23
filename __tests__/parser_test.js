import { parse } from '../parser/parser'

describe('parser', () => {
  test('parse testing', () => {
    const input = `abc
def

  foo

# foo

　　boo
# foo

「あああ」

「ああああ
あああ」



        

% コメント
（心の声）
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
            { type: 'break' },
            { type: 'speaking', contents: '「あああ」' },
            { type: 'break' },
            { type: 'speaking', contents: '「あああああああ」'},
            { type: 'break' },
            { type: 'comment', contents: 'コメント'},
            { type: 'speaking', contents: '（心の声）'},
          ],
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
