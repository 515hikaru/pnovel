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
    case 'speechend': {
      return contents + '」'
    }
    case 'thinkend': {
      return contents + '）'
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
      let text = '';
      if (contents[0].type === 'raw') {
        text = results.join('')
      } else {
        text =  '　' + results.join('')
      }
      if (text.slice(-1)[0] == '　') return text.slice(0, text.length-1)
      return text
    }
    case 'speaking': {
      return '「' + results.join('')
    }
    case 'thinking': {
      return '（' + results.join('')
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
