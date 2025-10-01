import {
  defineExtension,
} from "reactive-vscode";
import { logger } from "./utils";
import { registerCodeActions } from './codeAction'
import {registerCommand} from "./command"

export = defineExtension(() => {
  logger.info("Extension Activated");
  registerCommand();
  registerCodeActions()
});
