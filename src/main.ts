import * as fs from 'fs'
import * as path from 'path'

import { Command } from 'commander'

// @ts-ignore
import { parse } from '../parser/parser'
import { parseEntireDocument } from './eval'

const VERSION = 'v0.4.8-dev'

const program = new Command()

function initProgram() {
  program
    .version(VERSION)
    .option('-d, --debug', 'Show a result of parsing.')
    .option('-s, --stdin', 'Read from standard input')
    .option('-o, --output <file>', 'Place the output into <file>.')
    .parse(process.argv)
}

function readFile(file: string) {
  const filePath = path.resolve(file)
  return fs.readFileSync(filePath, 'utf-8')
}

function writeFile(outputPath: string, content: string) {
  content = addLastEmptyLine(content)
  try {
    fs.writeFileSync(outputPath, content);
  }  catch(e) {
    console.error(e.message)
  }
}

function addLastEmptyLine(content: string) {
  if(content.slice(-1) !== '\n') {
    content += '\n'
  }
  return content
}

export function transform(content: string) {
  content = addLastEmptyLine(content)
  const jsonContent = parse(content)
  if (program.debug) console.debug(jsonContent)
  return parseEntireDocument(jsonContent)
}

export function main() {
  initProgram()
  if (program.args.length === 0) {
    console.log('pnovel needs a file path.')
    console.log('$ pnovel <file path>')
    return
  }

  // look up the file path
  const file = program.args[0]
  try {
    fs.statSync(path.resolve(file))
  } catch {
    console.log(`no such a file: ${file}`)
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
