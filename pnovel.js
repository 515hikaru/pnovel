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

block = header / paragraph / blankline / whitespace

/*
header = prefix: "#" + " " textline: textline {
  return { type: "header", contents: textline }
}


conversation = prefix: "「" textline: textline + blankline ?{
  return { type: "conversation", contents: textline }
}

internal = prefix: "（" textline: textline + blankline ?{
  return { type: "internal", contents: textline }
}

textline = inline: inline + blankline ? {
  return inline;
}
*/

header = prefix:"#" whitespaces line:(char+ blankline)+ blankline? {
  const str = makeLine(line)
  return {type: "header", contents: str}
}

paragraph = whitespaces line:(char+ blankline)+ blankline?{
  const str = makeLine(line)
  return { type: "paragraph", contents: str };
}

char = [^\n]

blankline = [\n]
// special = [「」（）()#]
whitespace "whitespace" = [ 　\t\r\n]
whitespaces "whitespaces" = whitespace*
