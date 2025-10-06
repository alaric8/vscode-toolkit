import { useCommand } from "reactive-vscode";
import {generateSnippet} from "@/command/snippet"
import {activateFileInExplorer} from "@/command/fileInExplorer"
export function registerCommand() {
    useCommand('vscode-toolkit.generateSnippet',generateSnippet)
    useCommand("vscode-toolkit.showActiveFileInExplorer",activateFileInExplorer)
}
