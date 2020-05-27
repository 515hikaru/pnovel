import { transform } from '../src/main'

describe('test parsing', () => {
    test('normal parsing', () => {
        const text = 'foo\n'
        const expected = '　ｆｏｏ'
        const result = transform(text)
        expect(result).toBe(expected)
    })

    test('do not have last newline', () => {
        const text = 'foo'
        const expected = '　ｆｏｏ'
        const result = transform(text)
        expect(result).toBe(expected)
    }) 
})
