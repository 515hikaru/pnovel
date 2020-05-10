/*
 * Definition of pnovel parser
 */
start = doc

doc = block:block+ {
  return { type: "doc", contents: block};
}

block = header / paragraph / blankline

header = prefix:"#" + " " textline:textline {
    return { type: "header", contents: "[chapter:" + textline[0].contents + "]" }
}

paragraph = textline:textline+blankline? {
    return { type: "paragraph", contents: textline}
}

textline = inline:inline+ blankline? {
  return inline;
}

inline = char:char+ {
  return { type: "chars" , contents: char.join("") };
}

char = [^\n]
blankline = [\n] {
  return { type: "break" };
}
