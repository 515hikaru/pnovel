const parser = require('../parser/parser')

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
      const results = ['　']
      contents.flat().forEach(element => {
        const text = parseDocumentNode(element)
        results.push(text)
      })
      const result = results.join('')
      return result + '\n'
    }
    case 'chars':
      return contents
    case 'break':
      return '\n'
    default:
      return ''
  }
}

function main () {
  const doc = `# はじめに

春はあけぼの
ようよう白くなりry

枕草子をいきなり空で書くなんて無理だったわ。
`
  const result = parser.parse(doc)
  console.log(parseDocumentNode(result))
  console.log(JSON.stringify(result))
}

main()
