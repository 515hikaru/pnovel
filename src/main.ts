import * as fs from "fs"
import * as path from "path"
import * as process from "process"

import { Command } from "commander"

// @ts-ignore
import { parse } from "../parser/parser"
import { PixivNovelTransformer } from "./pixivNovelTransformer.ts"
import { NarouSyosetsuTransformer } from "./narouSyosetsuTransformer.ts"

const VERSION = "v0.7.9"

type Mode = "pixiv" | "narou"

type CommandField = {
  debug: any
  stdin: any
  output: string
  mode: Mode
}

// https://stackoverflow.com/questions/42056246/node-js-process-stdin-issues-with-typescript-tty-readstream-vs-readablestream
const stdin: any = process.stdin

const program = new Command() as Command & CommandField

function initProgram() {
  program.version(VERSION, "-v, --version", "Show version information")
  program
    .option("-d, --debug", "Show a result of parsing")
    .option("-s, --stdin", "Read from standard input")
    .option("-o, --output <file>", "Place the output into <file>")
    .option("-m, --mode <type>", "Format of novel", "pixiv")
    .allowUnknownOption()
    .argument("[input]", "input file path")
    .parse()

    if (!["pixiv", "narou"].includes(program.opts().mode)) {
    throw new Error(`No such mode: ${program.opts().mode}`)
  }
}

function lookUpFile(): string {
  // look up the file path
  if (program.opts().stdin) return ""
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
  if (program.opts().stdin) return fs.readFileSync(stdin.fd, "utf-8")
  const filePath = path.resolve(file)
  return fs.readFileSync(filePath, "utf-8")
}

function writeFile(outputPath: string, content: string) {
  content = addLastEmptyLine(content)
  try {
    fs.writeFileSync(outputPath, content)
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      console.error(e)
    }
    process.exit(1)
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
  if (program.opts().debug) console.debug(JSON.stringify(jsonContent))
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
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      console.error(e)
    }
    process.exit(1)
  }
  let file = ""
  try {
    file = lookUpFile()
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      console.error(e)
    }
    process.exit(1)
  }

  const fileContent = readFile(file)
  const transformedContent = transform(fileContent, program.opts().mode)
  if (program.opts().output) {
    writeFile(program.opts().output, transformedContent)
    return
  }
  console.log(transformedContent)
}
