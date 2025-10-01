import { useCodeAction } from '@/composable/useCodeAction'
import { generateSnippetAction } from './snippet'

export function registerCodeActions() {
  useCodeAction('*',generateSnippetAction)
}