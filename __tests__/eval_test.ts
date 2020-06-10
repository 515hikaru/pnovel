import { parseDocumentBlock, parseEntireDocument } from '../src/eval'


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

  test('comment parser', () => {
    const obj = {type: 'cooment', contents: 'コメント'}
    expect(parseDocumentBlock(obj)).toBe('')
  })

  test('parse entire document', () => {
    const obj = {type: 'doc', contents: [
      { type: 'header', contents: 'foo' },
      { type: 'break', contents: ''},
      { type: 'sentence', contents: 'foo'},
      { type: 'break', contents: ''},
      { type: 'raw', contents: '[newpage]'},
      { type: 'break', contents: ''},
    ]}
    expect(parseEntireDocument(obj)).toBe('[chapter:foo]\n　foo\n[newpage]\n')
  })
})
