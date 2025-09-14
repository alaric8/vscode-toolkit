import {
  defineExtension,
} from "reactive-vscode";
import { logger } from "./utils";

export = defineExtension(() => {
  logger.info("Extension Activated");
});
