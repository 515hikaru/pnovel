import { parseDocumentBlock } from '../src/eval'
import { TestScheduler } from 'jest'
// import { TestScheduler } from 'jest';

describe('parser', () => {
  test('parse paragraph node', () => {
    const obj = { type: 'sentence', contents: 'foo' }
    expect(parseDocumentBlock(obj)).toBe('　foo')
  })

  test('parse speaking', () => {
    const obj = {
      type: 'speaking',
      contents: '「あああ」'
    }
    const received = parseDocumentBlock(obj)
    expect(received).toBe('「あああ」')
  })

  test('parse header', () => {
    const obj = { type: 'header', contents: 'foo' }
    expect(parseDocumentBlock(obj)).toBe('[chapter:foo]')
  })
})
