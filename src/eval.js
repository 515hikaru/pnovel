const parser = require('../dist/parser')

const doc = `# はじめに

春はあけぼの
ようよう白くなりry

枕草子をいきなり空で書くなんて無理だったわ。
`

function parseDocumentNode (node) {
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
      const paragraphs = []
      contents.flat().forEach(element => {
        const text = parseDocumentNode(element)
        paragraphs.push(text)
      })
      const paragraph = paragraphs.join('')
      return paragraph + '\n'
    }
    case 'chars':
      return contents
    case 'break':
      return '\n'
    default:
      return ''
  }
}

const result = parser.parse(doc)

console.log(parseDocumentNode(result))
console.log(JSON.stringify(result))
