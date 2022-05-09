import * as fs from "fs"
import * as path from "path"
import * as process from "process"

import { Command } from "commander"

// @ts-ignore
import { parse } from "../parser/parser"
import { PixivNovelTransformer } from "./pixivNovelTransformer"
import { NarouSyosetsuTransformer } from "./narouSyosetsuTransformer"

const VERSION = "v0.6.9-dev"

type Mode = "pixiv" | "narou"

// https://stackoverflow.com/questions/42056246/node-js-process-stdin-issues-with-typescript-tty-readstream-vs-readablestream
const stdin: any = process.stdin

const program = new Command()

function initProgram() {
  program
    .version(VERSION)
    .option("-d, --debug", "Show a result of parsing")
    .option("-s, --stdin", "Read from standard input")
    .option("-o, --output <file>", "Place the output into <file>")
    .option("-m, --mode <type>", "Format of novel", "pixiv")
    .parse(process.argv)

  if (!["pixiv", "narou"].includes(program.mode)) {
    throw new Error(`No such mode: ${program.mode}`)
  }
}

function lookUpFile(): string {
  // look up the file path
  if (program.stdin) return ""
  if (program.args.length === 0) {
    const error = new Error(`pnovel needs a file path.
$ pnovel <file path>
`)
    throw error
  }
  const file = program.args[0]
  try {
    fs.statSync(path.resolve(file))
  } catch {
    const fileNotFoundError = new ReferenceError(`no such a file: ${file}`)
    throw fileNotFoundError
  }
  return file
}

function readFile(file: string) {
  if (program.stdin) return fs.readFileSync(stdin.fd, "utf-8")
  const filePath = path.resolve(file)
  return fs.readFileSync(filePath, "utf-8")
}

function writeFile(outputPath: string, content: string) {
  content = addLastEmptyLine(content)
  try {
    fs.writeFileSync(outputPath, content)
  } catch (e) {
    console.error(e.message)
  }
}

function addLastEmptyLine(content: string) {
  if (content.slice(-1) !== "\n") {
    content += "\n"
  }
  return content
}

export function transform(content: string, mode: Mode): string {
  content = addLastEmptyLine(content)
  const jsonContent = parse(content)
  if (program.debug) console.debug(JSON.stringify(jsonContent))
  let transformer
  switch (mode) {
    case "pixiv":
      transformer = new PixivNovelTransformer(jsonContent)
      break
    default:
      transformer = new NarouSyosetsuTransformer(jsonContent)
      break
  }
  return transformer.transform()
}

export function main(): void {
  try {
    initProgram()
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
  let file = ""
  try {
    file = lookUpFile()
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }

  const fileContent = readFile(file)
  const transformedContent = transform(fileContent, program.mode)
  if (program.output) {
    writeFile(program.output, transformedContent)
    return
  }
  console.log(transformedContent)
}

exports.main = main
