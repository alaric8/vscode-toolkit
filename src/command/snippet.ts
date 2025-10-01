import { escapeSnippetText } from '@/composable/useSnippet'
import { window, SnippetString, LanguageModelChatMessage } from 'vscode'

/**
 * 插入 snippet 命令逻辑
 * @param text 用户选中的文本
 */
export async function generateSnippet(text: string) {
  const snippet_str =  escapeSnippetText(text);
  console.log(snippet_str.split('\n'));
  
}