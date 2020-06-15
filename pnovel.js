/*
 * Definition of pnovel parser
 */

start = doc

doc = block:block+ {
  return { type: "doc", contents: block }
}

block = blank / header / speaking / thinking / sentence 

// 見出しは1行
header = [#] _ content:content+ _ blank {
  return {type: "header", contents: content}
}

speaking = _ "「" _ content:content+  blank? {
  return {type: "speaking", contents: content}
}

thinking = "（" _ content:content+ blank? {
  return { type: "thinking", contents: content}
}

sentence = content:content+ _ blank? {
  return {type: "sentence", contents: content}
}

content = raw / comment / speakend / thinkend / text

text = _ text:chars _ blank? {
  return {type: "text", contents: text}
}
comment = _ "%" _ text:[^\n]+ _ blank? {
  return {type: "comment", contents: text.join("")}
}

raw = "`" text:.+ "`" {
  return {type: "raw", contents: text.join("")}
}

speakend = _ text:chars _ "」" _ blank? {
  return {type: "speechend", contents: text }
}

thinkend = _ text:chars _  "）" _ blank? {
  return {type: "thinkend", contents: text }
}


char = [^「」（）`%\n]
useChar = whitespace / char
chars = text:useChar+ {
  return text.join("")
}
blank = "\n" {
  return {type: "break", contents: []}
}
whitespace "whitespace" = [ 　\t\r] {
  return ''
}
_ "whitespaces" = whitespace*
