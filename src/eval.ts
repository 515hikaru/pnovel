type Mode = "pixiv" | "narou"

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


export function excludeCommentNode(node: DocumentBlock): DocumentBlock {
  const { type, contents } = node
  const newContents: DocumentToken[] = []
  contents.forEach((element) => {
    const { type, contents } = element
    if (type !== "comment") newContents.push({ type, contents })
  })
  if (newContents.length === 0) return { type: "sentence", contents: [] }
  if (type !== "sentence") return { type: type, contents: newContents }
  if (newContents[0].contents[0] === "（") {
    return { type: "thinking", contents: trimFirstSymbol(newContents) }
  }
  if (newContents[0].contents[0] === "「") {
    return { type: "speaking", contents: trimFirstSymbol(newContents) }
  }
  return { type: type, contents: newContents }
}

function trimFirstSymbol(tokens: DocumentToken[]): DocumentToken[] {
  const head = tokens[0]
  head.contents = head.contents.slice(1)
  return tokens
}

export function parseDocumentToken(node: DocumentToken): string {
  const { type, contents } = node
  switch (type) {
    case "speechend": {
      return contents + "」"
    }
    case "thinkend": {
      return contents + "）"
    }
    default:
      return contents
  }
}

export function parseDocumentBlock(node: DocumentBlock): string {
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
      return `[chapter:${results.join("")}]`
    }
    case "break": {
      return ""
    }
    default: {
      return results.join("")
    }
  }
}
