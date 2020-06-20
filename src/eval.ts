interface DocumentToken {
  type: string,
  contents: string
}

interface DocumentBlock {
  type: string,
  contents: DocumentToken[]
}

interface Document {
  type: string,
  contents: DocumentBlock[]
}

export function parseDocumentToken (node: DocumentToken): string {
  const { type, contents } = node
  switch (type) {
    case 'comment': {
      return ''
    }
    default:
      return contents
  }
}

function parseDocumentBlock (node: DocumentBlock): string {
  const { type, contents } = node
  const results: string[] = []
  contents.forEach(element => {
    results.push(parseDocumentToken(element))
  })
  switch (type) {
    case 'sentence': {
      if (contents[0].type === 'raw') {
        return results.join('')
      }
      return '　' + results.join('')
    }
    case 'speaking': {
      return '「' + results.join('') + '」'
    }
    case 'thinking': {
      return '（' + results.join('') + '）'
    }
    case 'header': {
      return `[chapter:${results.join()}]`
    }
    default: {
      return results.join('')
    }
  }
}

export function parseEntireDocument (node: Document): string {
  const { type, contents } = node
  switch (type) {
    case 'doc': {
      const results: string[] = []
      contents.forEach(element => {
        const text = parseDocumentBlock(element)
        results.push(text)
      })
      return results.join('\n') + '\n'
    }
    default:
      return ''
  }
}
