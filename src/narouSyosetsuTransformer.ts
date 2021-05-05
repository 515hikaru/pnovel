// import type { DocumentToken, DocumentBlock, Document } from "./eval"
import { excludeCommentNode, parseDocumentToken } from "./eval"
// TODO: 2重管理やめる
// See: https://github.com/benmosher/eslint-plugin-import/pull/1974
interface DocumentToken {
  type: string
  contents: string
}

interface DocumentBlock {
  type: string
  contents: DocumentToken[]
}

interface Document {
  type: string
  contents: DocumentBlock[]
}

export class NarouSyosetsuTransformer {
  document: Document

  constructor(document: Document) {
    this.document = document
  }

  parseDocumentBlock(node: DocumentBlock): string {
    const { type, contents } = node
    const results: string[] = []
    contents.forEach((element) => {
      results.push(parseDocumentToken(element))
    })
    switch (type) {
      case "sentence": {
        let text = ""
        if (contents[0].type === "raw") {
          text = results.join("")
        } else if (contents[0].type === "pixivToken") {
        } else {
          text = "　" + results.join("")
        }
        if (text.slice(-1)[0] === "　") return text.slice(0, text.length - 1)
        return text
      }
      case "speaking": {
        return "「" + results.join("")
      }
      case "thinking": {
        return "（" + results.join("")
      }
      case "header": {
        return `\n${results.join("")}]\n`
      }
      case "break": {
        return ""
      }
      default: {
        return results.join("")
      }
    }
  }

  transform(): string {
    const { type, contents } = this.document
    switch (type) {
      case "doc": {
        const results: string[] = []
        contents.forEach((element) => {
          const filterBlocks = excludeCommentNode(element)
          if (filterBlocks.contents.length === 0) {
            return
          }
          const text = this.parseDocumentBlock(filterBlocks)
          results.push(text)
        })
        return results.join("\n") + "\n"
      }
      default:
        return ""
    }
  }
}
