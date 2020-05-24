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

block =  emptyline / comment / header / sentence / speaking / breakline

header = prefix:"#" whitespaces line:(char+ blankline) {
  const str = makeLine(line)
  return {type: "header", contents: str}
}

speaking = whitespaces line:(startToken? char+ endToken? blankline)+ {
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

emptyline = whitespaces "[newline]" whitespaces breakline {
  return {type: "break", contents: ""}
}

comment = whitespaces "%" comment:char+ breakline {
  return {type: "comment", contents: comment.join("").trim()}
}

char = wideToken / [^\n]
blankline = [\n]
startToken = ["「（"]
endToken = ["」）"]

wideToken = char:[0-9a-zA-Z!?] {
  return String.fromCharCode(char.charCodeAt(0) + 0xFEE0);
}

whitespace "whitespace" = [ 　\t\r]
whitespaces "whitespaces" = whitespace*
