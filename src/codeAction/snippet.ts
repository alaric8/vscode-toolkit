import type { TextDocument, Range, CodeAction } from 'vscode'
import { CodeActionKind } from 'vscode'  // 这是值


/**
 * 返回一个 CodeAction 对象
 */
export function generateSnippetAction(document: TextDocument, range: Range): CodeAction | undefined {
  if (range.isEmpty) return

  const selectedText = document.getText(range)
   
  return {
    title: "生成 Snippet",
    kind: CodeActionKind.RefactorRewrite, // 蓝色灯泡
    command: {
      title: "生成 Snippet",
      command: "vscode-toolkit.generateSnippet",
      arguments: [selectedText],
    },
  }
}
