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
      const text = parseDocumentNode(contents[0])
      return `[chapter:${text}]\n`
    }
    case 'paragraph': {
      const results = []
      contents.flat().forEach(element => {
        const text = parseDocumentNode(element)
        results.push(text)
      })
      const result = results.join('')
      return '　' + result + '\n'
    }
    case 'conversation': {
      const results = []
      contents.flat().forEach(element => {
        const text = parseDocumentNode(element)
        results.push(text)
      })
      const result = results.join('')
      return '「' + result + '\n'
    }
    case 'chars':
      return contents
    case 'break':
      return '\n'
    default:
      return ''
  }
}
