import {expect, test} from "vitest"
import {escapeSnippetText} from "@/composable/useSnippet"

test("useSnippet", () => {
  // TODO
  const text  = escapeSnippetText("Hello $world. This is a test. \\ ${test}");
  console.log(text);
   
   expect(true).toBe(true);  
})