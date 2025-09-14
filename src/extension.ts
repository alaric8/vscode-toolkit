import {
  defineExtension,
  useCommand,
  useCommentController,
  useIsDarkTheme,
  watchEffect,
} from "reactive-vscode";
import { logger } from "./utils";

export = defineExtension(() => {
  logger.info("Extension Activated");
  const isDark = useIsDarkTheme();
  watchEffect(() => {
    logger.info("Is Dark Theme:", isDark.value);
  });
});
