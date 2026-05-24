// @ts-ignore
import { parse } from "../parser/parser"
import { NarouSyosetsuTransformer } from "./narouSyosetsuTransformer.ts"
import { PixivNovelTransformer } from "./pixivNovelTransformer.ts"

export type Mode = "pixiv" | "narou"

function addLastEmptyLine(content: string) {
  if (content.slice(-1) !== "\n") {
    content += "\n"
  }
  return content
}

export function transform(content: string, mode: Mode, debug = false): string {
  content = addLastEmptyLine(content)
  const jsonContent = parse(content)
  if (debug) console.debug(JSON.stringify(jsonContent))
  const transformer =
    mode === "pixiv" ? new PixivNovelTransformer(jsonContent) : new NarouSyosetsuTransformer(jsonContent)
  return transformer.transform()
}
