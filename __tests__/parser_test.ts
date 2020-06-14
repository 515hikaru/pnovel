// @ts-ignore
import { parse } from '../parser/parser'

describe('parser', () => {
  test('parse testing', () => {
    const input = `abc
def

   aaa

こんにちは

「こんにちは」

「こんにち
は」
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
          type: 'break', contents: []
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'aaa' }
          ]
        },
        {
          type: 'break', contents: []
        },
        {
          type: 'sentence',
          contents: [
            { type: 'text', contents: 'こんにちは' }
          ]
        },
        {
          type: 'break', contents: []
        },
        {
          type: 'speaking',
          contents: [
            { type: 'text', contents: 'こんにちは' }
          ]
        },
        {
          type: 'break', contents: []
        },
        {
          type: 'speaking',
          contents: [
            { type: 'text', contents: 'こんにち' },
            { type: 'text', contents: 'は' }
          ]
        },
        {
          type: 'break', contents: []
        }
      ]
    }
    expect(parse(input)).toStrictEqual(expected)
  })
})
