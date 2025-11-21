import { useFoldingRangeProvider } from 'reactive-vscode';
import * as vscode from 'vscode';

export function registerHtmlFolding() {
  useFoldingRangeProvider(
    { language: 'html' },
    (document: vscode.TextDocument, token: vscode.CancellationToken) => {
      const ranges: vscode.FoldingRange[] = [];
      const text = document.getText(); // ✅ 这里 document 已经被 VS Code 传入

      const regex = /<(div|section)\b[^>]*>[\s\S]*?<\/\1>/g;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        const startLine = document.positionAt(match.index).line;
        const endLine = document.positionAt(match.index + match[0].length).line;
        if (startLine < endLine) {
          ranges.push(new vscode.FoldingRange(startLine, endLine));
        }
      }

      return ranges;
    }
  );
}
