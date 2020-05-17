/*
 * Definition of pnovel parser
 */

{
  function makeLine(l) {
    const chars = l.flat(2)
    return chars.join("").trim().replace(/(\r\n|\n|\r)/gm, "")
  }
}

start = doc

doc = block: block + {
  return { type: "doc", contents: block };
}

block =  header / sentence / speaking / breakline

header = prefix:"#" whitespaces line:(char+ blankline) {
  const str = makeLine(line)
  return {type: "header", contents: str}
}

speaking = whitespaces line:(["「（"]? char+ ["）」"]? blankline)+ {
  const str = makeLine(line)
  return {type: "speaking", contents: str}
}

sentence = whitespaces line:(!startToken char+ !endToken blankline)+ {
  const str = makeLine(line)
  return { type: "sentence", contents: str }
}

breakline = (whitespaces blankline)+ {
  return {type: "break"}
}

char = [^\n]
blankline = [\n]
startToken = ["「（"]
endToken = ["」）"]

whitespace "whitespace" = [ 　\t\r]
whitespaces "whitespaces" = whitespace*
