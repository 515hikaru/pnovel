import * as fs from 'fs'
import * as path from 'path'

import { Command } from 'commander'

import { parse } from '../parser/parser'
import { parseDocumentNode } from './eval'

const program = new Command()

const readFile = (file) => {
  const filePath = path.resolve(file)
  return fs.readFileSync(filePath, 'utf-8')
}

const main = () => {
  // validate arguments
  program.parse(process.argv)
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
  const parsedJSON = parse(fileContent)
  const evals = parseDocumentNode(parsedJSON)
  console.log(evals)
}

main()
