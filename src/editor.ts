import { transform, type Mode } from "./transform.ts"

const initialText = `# タイトル

こんにちは。 % コメントは出力されません
こんばんは

「会話文です」

|漢字<ふりがな>にルビを振れます。
`

function queryRequired<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector)
  if (!element) {
    throw new Error(`Editor element is missing: ${selector}`)
  }
  return element
}

const rawInput = queryRequired<HTMLTextAreaElement>("#raw-input")
const previewOutput = queryRequired<HTMLElement>("#preview-output")
const modeSelect = queryRequired<HTMLSelectElement>("#mode-select")
const errorMessage = queryRequired<HTMLElement>("#error-message")
const copyButton = queryRequired<HTMLButtonElement>("#copy-button")
const clearButton = queryRequired<HTMLButtonElement>("#clear-button")

rawInput.value = initialText

function getMode(): Mode {
  return modeSelect.value === "narou" ? "narou" : "pixiv"
}

function renderPreview() {
  try {
    const result = transform(rawInput.value, getMode())
    previewOutput.textContent = result
    errorMessage.textContent = ""
    copyButton.disabled = result.length === 0
  } catch (error: unknown) {
    previewOutput.textContent = ""
    copyButton.disabled = true
    errorMessage.textContent = error instanceof Error ? error.message : String(error)
  }
}

rawInput.addEventListener("input", renderPreview)
modeSelect.addEventListener("change", renderPreview)

copyButton.addEventListener("click", async() => {
  const text = previewOutput.textContent ?? ""
  if (text.length === 0) return

  await navigator.clipboard.writeText(text)
  copyButton.textContent = "Copied"
  window.setTimeout(() => {
    copyButton.textContent = "Copy"
  }, 900)
})

clearButton.addEventListener("click", () => {
  rawInput.value = ""
  rawInput.focus()
  renderPreview()
})

renderPreview()
