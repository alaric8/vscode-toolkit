import { useVscodeContext, useActiveTextEditor, watchEffect, computed } from "reactive-vscode";
import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";

export function registerContext(context: ExtensionContext) {
    const editor = useActiveTextEditor();
    const resourceInWorkspace = useVscodeContext("resourceIsInWorkspace", computed(()=>{
         if(!editor.value){
            return false;
         }
        return  Boolean(vscode.workspace.getWorkspaceFolder( editor.value.document.uri)); 
    }));
  
}
