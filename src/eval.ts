interface DocumentBlock {
  type: string,
  contents: string
}

interface EntireDocument {
  type: string,
  contents: DocumentBlock[]
}

export function parseDocumentBlock(node: DocumentBlock): string {
  const { type, contents } = node
  switch (type) {
    case 'header': {
      const text = contents
      return `[chapter:${text}]`
    }
    case 'sentence': {
      const text = contents
      return '　' + text
    }
    case 'speaking': {
      const text: string = contents
      return text
    }
    case 'break':
      return '\n'
    default:
      return ''
  }
}

export function parseEntireDocument (node: EntireDocument): string {
  const { type, contents } = node
  switch (type) {
    case 'doc': {
      const results: string[] = []
      contents.forEach(element => {
        const text = parseDocumentBlock(element)
        results.push(text)
      })
      return results.join('')
    }
    default:
      return ''
  }
}
