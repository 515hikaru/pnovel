import type { DocumentBlock, DocumentToken, Document } from "./eval.ts"
import { excludeCommentNode } from "./eval.ts"

export class NarouSyosetsuTransformer {
  document: Document

  constructor(document: Document) {
    this.document = document
  }

  parseDocumentBlock(node: DocumentBlock): string {
    const { type, contents } = node
    const results: string[] = []
    contents.forEach((element) => {
      results.push(this.parseDocumentToken(element))
    })
    switch (type) {
      case "sentence": {
        let text = ""
        if (contents[0].type === "raw") {
          text = results.join("")
        } else if (contents[0].type !== "pixivToken") {
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
        return `\n${results.join("")}\n`
      }
      case "break": {
        return ""
      }
      default: {
        return results.join("")
      }
    }
  }

  parseDocumentToken(node: DocumentToken): string {
    const { type, contents } = node
    switch (type) {
      case "speechend": {
        return contents + "」"
      }
      case "thinkend": {
        return contents + "）"
      }
      case "ruby": {
        return `|${contents}《${node.yomi}》`
      }
      default:
        return contents
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
