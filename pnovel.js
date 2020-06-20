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

content = newLineToken / specialToken / rawBlock / rawToken / comment / speakend / thinkend / text

text = _ text:chars _ blank? {
  return {type: "text", contents: text}
}
comment = _ "%" _ text:[^\n]+ _ blank {
  return {type: "comment", contents: text.join("")}
}

rawToken = "`" text:[^\n"`"]+ "`" _ blank? {
  return {type: "raw", contents: text.join("")}
}

rawBlock = _ "```" blank? text:([^\n"`"]+ blank?)+ _ blank? _ "```" blank? {
  const lines = []
  text.forEach(line => {
    lines.push(line[0].join(""))
  });
  return {type: "raw", contents: lines.join("\n")}
}

specialToken = _ "[" text:[^\]\n]+ "]" _ blank? {
  return {type: "raw", contents: "[" + text.join("") + "]"}
}

newLineToken = _ "[newline]" _ blank? {
  return {type: "break", contents: []}  
}

speakend = _ texts:(speechChars _ specialSymbol?)+ "」" _ blank? {
  const useTexts = []
  const lastIndex = texts.length - 1
  texts.forEach((text, i,) => {
    if (i == lastIndex && text[2]) {
      const t = text[0] + text[2][0]
      useTexts.push(t)
      return
    }
    if (text[2]) {
      const t = text[0] + text[2]
      useTexts.push(t)
      return
    }
    const t = text[0]
    useTexts.push(t)
    return
  })
  return {type: "speechend", contents: useTexts.join("") }
}

thinkend = _ text:chars _  "）" _ blank? {
  return {type: "thinkend", contents: text }
}


char = [^「」（）\[\]!?！？`%\n]
useChar = whitespace / specialSymbol / hankakuEisu / char
chars = text:useChar+ {
  return text.join("")
}
speechChar = whitespace / hankakuEisu / char
speechChars = text:speechChar+ {
  return text.join("")
}
hankakuEisu = c:[a-zA-Z0-9] {
  return String.fromCharCode(c.charCodeAt(0) + 0xFEE0);
}

specialSymbol = s:[!?！？] {
  if (["!", "?"].includes(s)) {
    s = String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  }
  return s + "　"
}

blank = "\n" {
  return {type: "break", contents: []}
}
whitespace "whitespace" = [ 　\t\r] {
  return ''
}
_ "whitespaces" = whitespace*
