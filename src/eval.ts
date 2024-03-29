export interface DocumentToken {
  type: string
  contents: string
  yomi?: string
}

export interface DocumentBlock {
  type: string
  contents: DocumentToken[]
}

export interface Document {
  type: string
  contents: DocumentBlock[]
}


export function excludeCommentNode(node: DocumentBlock): DocumentBlock {
  const { type, contents } = node
  const newContents: DocumentToken[] = []
  contents.forEach((element) => {
    const { type, contents, yomi } = element
    if (type !== "comment") newContents.push({ type, contents, yomi })
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
