export function parseDocumentNode (node) {
  const { type, contents } = node
  switch (type) {
    case 'doc': {
      const results = []
      contents.forEach(element => {
        const text = parseDocumentNode(element)
        results.push(text)
      })
      return results.join('')
    }
    case 'header': {
      const text = contents
      return `[chapter:${text}]\n`
    }
    case 'sentence': {
      const text = contents
      return '　' + text + '\n'
    }
    case 'speaking': {
      const text = contents
      return text + '\n'
    }
    case 'break':
      return '\n'
    default:
      return ''
  }
}
