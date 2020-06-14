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
    case 'text':
      return contents
    case 'raw': {
      return contents
    }
    case 'comment':
      return ''
    case 'token':
      return contents
    case 'break':
      return '\n'
    default:
      return ''
  }
}

function parseDocumentBlock (node: DocumentBlock): string {
  const { type, contents } = node

  contents.forEach(element => {
  })
  switch (type) {
    case 'break':
      return '\n'
    default: {
      const results: string[] = []
      contents.forEach(element => {
        results.push(parseDocumentToken(element))
      })
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
      return results.join('')
    }
    default:
      return ''
  }
}
