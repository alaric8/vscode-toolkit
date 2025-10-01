import { useCommand } from "reactive-vscode";
import {generateSnippet} from "@/command/snippet"

export function registerCommand() {
    useCommand('vscode-toolkit.generateSnippet',generateSnippet)
}