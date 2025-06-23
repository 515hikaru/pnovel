/*
 * Definition of pnovel parser
 */

{

  function flattenEndSymbols(texts) {
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
    return useTexts
  }

}

start = doc

doc = block:block+ {
  return { type: "doc", contents: block }
}

block = blank / header / emptyHeader / speaking / thinking / sentence

// 見出しは1行
header = "#" _ content:content+ _ blank? {
  return {type: "header", contents: content}
}

emptyHeader = "#" blank? {
  return {type: "sentence", contents: [{ type: 'text', contents: '#'}]}
}

speaking = _ "「" _ content:content+  blank? {
  return {type: "speaking", contents: content}
}

thinking = _ "（" _ content:content+ blank? {
  return { type: "thinking", contents: content}
}

sentence = content:content+ _ blank? {
  return {type: "sentence", contents: content}
}

content = newLineToken / pixivRubyToken / rubyToken / specialToken / rawBlock / rawToken / comment / speakend / thinkend / text

text = _ text:contentChars _ blank? {
  return {type: "text", contents: text}
}
comment = _ "%" _ text:[^\n]* _ blank {
  return {type: "comment", contents: text.join("")}
}

rawToken = "`" text:[^\n"`"]+ "`" _ blank? {
  return {type: "raw", contents: text.join("")}
}

rubyToken = _ "|" _ kanji:[^<]+ _ "<" _ ruby:[^>]+ _ ">" _ blank? {
  return {type: "ruby", contents: kanji.join(""), yomi: ruby.join("")}
}

rawBlock = _ "```" blank? text:([^"`"]+ blank?)+ _ blank? _ "```" blank? {
  const lines = []
  text.forEach(line => {
    lines.push(line[0].join(""))
  });
  return {type: "raw", contents: lines.join("\n").trim()}
}

specialToken = _ "[" text:[^\]\n]+ "]" _ blank? {
  return {type: "pixivToken", contents: "[" + text.join("") + "]"}
}

pixivRubyToken = _ "[" "[" text:[^\]\n]+ "]" "]" _ blank? {
  return {type: "text", contents: "[[" + text.join("") + "]]"}
}

newLineToken = _ "[newline]" _ blank? {
  return {type: "break", contents: []}  
}

speakend = _ texts:(speechChars _ specialSymbol?)+ "」" _ blank? {
  const useTexts = flattenEndSymbols(texts)
  return {type: "speechend", contents: useTexts.join("") }
}

thinkend = _ texts:(speechChars _ specialSymbol?)+ "）" _ blank? {
  const useTexts = flattenEndSymbols(texts)
  return {type: "thinkend", contents: useTexts.join("") }
}


char = [^「」（）\[\]!?！？`%#\n]
contentChar = [^\[\]!?！？`|%#\n]

useChar = whitespace / endOfSpecialSymbol / specialSymbol / hankakuEisu / char
useContentChar = whitespace / endOfSpecialSymbol / specialSymbol / hankakuEisu / contentChar
speechChar = whitespace / hankakuEisu / char

chars = text:useChar+ {
  return text.join("")
}

contentChars = text:useContentChar+ {
  return text.join("")
}

speechChars = text:speechChar+ {
  return text.join("")
}

hankakuEisu = c:[a-zA-Z0-9] {
  return String.fromCharCode(c.charCodeAt(0) + 0xFEE0);
}

specialSymbol = ss:[!?！？]+ {
  const tt = []
  ss.forEach((s) => {
    if (["!", "?"].includes(s)) {
      s = String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    }
    tt.push(s)
  })
  return tt.join("") + "　"
}

endOfSpecialSymbol = s:[!?！？] t:[」）] {
  if (["!", "?"].includes(s)) {
    s = String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  }
  return s + t
}

blank = "\n" {
  return {type: "break", contents: []}
}
whitespace "whitespace" = [ 　\t\r] {
  return ''
}

_ "whitespaces" = whitespace*
