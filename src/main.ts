import * as fs from "fs"
import * as path from "path"
import * as process from "process"

import { Command } from "commander"

// @ts-ignore
import { parse } from "../parser/parser"
import { parseEntireDocument } from "./eval"

const VERSION = "v0.6.4"

// https://stackoverflow.com/questions/42056246/node-js-process-stdin-issues-with-typescript-tty-readstream-vs-readablestream
const stdin: any = process.stdin

const program = new Command()

function initProgram() {
  program
    .version(VERSION)
    .option("-d, --debug", "Show a result of parsing")
    .option("-s, --stdin", "Read from standard input")
    .option("-o, --output <file>", "Place the output into <file>")
    .parse(process.argv)
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

export function transform(content: string) {
  content = addLastEmptyLine(content)
  const jsonContent = parse(content)
  if (program.debug) console.debug(JSON.stringify(jsonContent))
  return parseEntireDocument(jsonContent)
}

export function main() {
  initProgram()
  let file = ""
  try {
    file = lookUpFile()
  } catch (e) {
    console.log(e.message)
    return
  }

  const fileContent = readFile(file)
  const transformedContent = transform(fileContent)
  if (program.output) {
    writeFile(program.output, transformedContent)
    return
  }
  console.log(transformedContent)
}

exports.main = main
