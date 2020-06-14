/*
 * Definition of pnovel parser
 */

start = doc

doc = block:block+ {
  return { type: "doc", contents: block }
}

block = blank / header / speaking / sentence 

header = [#] _ content:content+ {
  return {type: "header", contents: content}
}

speaking = [「（] content:content+ {
  return {type: "speaking", contents: content}
}

sentence = content:content+ {
  return {type: "sentence", contents: content}
}

content = raw / comment / text

text = text:chars blank?{
  return {type: "text", contents: text}
}
comment = "%" _ text:chars _ blank {
  return {type: "comment", contents: text}
}

raw = "`" text:char+ "`" {
  return {type: "raw", contens: text.join("")}
}

char = [^`%\n]
chars = text:char+ {
  const trim_text = text.join("").replace(/[ 　\t\r]/g, '')
  return trim_text
}
blank = "\n" {
  return {type: "break", contents: []}
}
whitespace "whitespace" = [ 　\t\r]
_ "whitespaces" = whitespace*
