import { languages } from 'vscode'
import type { CodeActionProvider, CodeActionContext, TextDocument, Range, CodeAction } from 'vscode'

/**
 * useCodeAction - 注册一个 CodeActionProvider
 * @param selector - 语言选择器，例如 '*' 表示所有语言
 * @param provideAction - 回调函数，返回 CodeAction 或 undefined
 */
export function useCodeAction(
  selector: string,
  provideAction: (document: TextDocument, range: Range, context: CodeActionContext) => CodeAction | undefined
) {
  const provider: CodeActionProvider = {
    provideCodeActions(document, range, context) {
      const action = provideAction(document, range, context)
      return action ? [action] : []
    }
  }

  languages.registerCodeActionsProvider(selector, provider)
}
