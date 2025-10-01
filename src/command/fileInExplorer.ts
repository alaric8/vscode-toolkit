import vscode from "vscode"
export function activateFileInExplorer() {
  // 判断 当前是否有打开的文件 
  if (!vscode.window.activeTextEditor) {
    return;
  }
  // 判断 当前文件是否在工作区中
  if (!vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri)) {
    console.log('当前文件不在工作区中');
    return;
  }
  // 显示当前文件在资源管理器中
  return vscode.commands.executeCommand("workbench.files.action.showActiveFileInExplorer", vscode.window.activeTextEditor?.document.uri);
}