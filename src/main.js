import { parse } from '../parser/parser'
import { parseDocumentNode } from './eval'

function main () {
  const doc = `# はじめに

春はあけぼの
ようよう白くなりry

枕草子をいきなり空で書くなんて無理だったわ。

「会話文」

「改行
もできる？」

文章でも改行をしたいときは

と1行あけます。
`
  const result = parse(doc)
  console.log(parseDocumentNode(result))
  console.log(JSON.stringify(result))
}

main()
