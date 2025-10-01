import { workspace, window, SnippetString, Range } from 'vscode'
import type {TextEditor} from "vscode"
import { promises as fs } from 'node:fs'
import path from 'node:path'

export type SnippetBody = string | string[]

export interface SnippetItem {
  prefix: string
  body: SnippetBody
  description?: string
}


/**
 * Escapes special characters in a snippet text to ensure correct parsing by snippet engines.
 *
 * This function preserves snippet placeholders (e.g., `${1:placeholder}`) as-is,
 * while escaping backslashes (`\`), dollar signs (`$`), and closing curly braces (`}`) in all other text.
 *
 * @param text - The input string containing snippet text to be escaped.
 * @returns The escaped string, safe for use in snippet definitions.
 */
export function escapeSnippetText(text: string): string {
  return text.replace(/\$\{[^}]+\}|[^$\\}]+|[$\\}]/g, (match) => {
    // 如果匹配到占位符，原样返回
    if (/^\$\{[^}]+\}$/.test(match)) return match

    // 普通字符转义
    return match
      .replace(/\\/g, '\\\\')
      .replace(/\$/g, '\\$')
      .replace(/}/g, '\\}')
  })
}
/**
 * useSnippet - 操作 snippet 的 composable
 * @param language 目标语言，例如 'javascript'
 */
export function useSnippet(language: string) {
  /** 获取工作区 snippet 文件路径 */
  function getSnippetFilePath(): string | undefined {
    const folders = workspace.workspaceFolders
    if (!folders?.length) {
      window.showWarningMessage('没有打开工作区，无法操作 snippet 文件')
      return
    }
    const vscodeFolder = path.join(folders[0].uri.fsPath, '.vscode')
    return path.join(vscodeFolder, `${language}.json`)
  }

  /** 确保 .vscode 文件夹存在 */
  async function ensureVscodeFolderExists(): Promise<string | undefined> {
    const folders = workspace.workspaceFolders
    if (!folders?.length) return
    const vscodeFolder = path.join(folders[0].uri.fsPath, '.vscode')
    try {
      await fs.mkdir(vscodeFolder, { recursive: true })
    } catch {}
    return vscodeFolder
  }

  /** 读取 snippet 文件 */
  async function readSnippets(): Promise<Record<string, SnippetItem>> {
    const file = getSnippetFilePath()
    if (!file) return {}

    try {
      const content = await fs.readFile(file, 'utf-8')
      return JSON.parse(content)
    } catch {
      return {}
    }
  }

  /** 写入 snippet 文件 */
  async function writeSnippets(snippets: Record<string, SnippetItem>) {
    let file = getSnippetFilePath()
    if (!file) {
      const vscodeFolder = await ensureVscodeFolderExists()
      if (!vscodeFolder) return
      file = path.join(vscodeFolder, `${language}.json`)
    }

    try {
      const content = JSON.stringify(snippets, null, 2)
      await fs.writeFile(file, content, 'utf-8')
    } catch (err) {
      window.showErrorMessage(`写入 snippet 文件失败: ${err}`)
    }
  }

  /** 添加或更新 snippet */
  async function setSnippet(name: string, snippet: SnippetItem) {
    const snippets = await readSnippets()
    snippets[name] = snippet
    await writeSnippets(snippets)
  }

  /** 删除 snippet */
  async function removeSnippet(name: string) {
    const snippets = await readSnippets()
    if (snippets[name]) {
      delete snippets[name]
      await writeSnippets(snippets)
    }
  }

  /** 根据选区创建 snippet 并插入到编辑器 */
  async function insertSnippetFromSelection(editor: TextEditor, range: Range) {
    if (!editor || range.isEmpty) return
    const selectedText = editor.document.getText(range)
    const escaped = escapeSnippetText(selectedText)
    const snippet = new SnippetString(`\${1:${escaped}}`)
    await editor.insertSnippet(snippet, range)
  }

  return {
    readSnippets,
    writeSnippets,
    setSnippet,
    removeSnippet,
    getSnippetFilePath,
    ensureVscodeFolderExists,
    insertSnippetFromSelection,
    escapeSnippetText,
  }
}
