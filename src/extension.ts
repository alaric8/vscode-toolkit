import {
  defineExtension,
} from "reactive-vscode";
import { logger } from "@/utils";
import { registerCodeActions } from '@/codeAction'
import {registerCommand} from "@/command"
import { registerContext } from "@/context";

export = defineExtension((context) => {
  logger.info("Extension Activated");
  registerContext(context)
  registerCommand();
  registerCodeActions()
});
