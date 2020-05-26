import * as fs from 'fs'
import * as path from 'path'

import { Command } from 'commander'

// @ts-ignore
import { parse } from '../parser/parser'
import { parseEntireDocument } from './eval'

const program = new Command()

const readFile = (file: string) => {
  const filePath = path.resolve(file)
  return fs.readFileSync(filePath, 'utf-8')
}

const main = () => {
  // validate arguments
  program
    .version('v0.4.5')
    .parse(process.argv)
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
  const evals = parseEntireDocument(parsedJSON)
  console.log(evals)
}

main()
