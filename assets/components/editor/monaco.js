import MonacoEditor, { useMonaco } from "@monaco-editor/react"
import { useEffect } from "react"
import themeData from "./theme.json"

const extendTheme = async (monaco, customTokenizer) => {
  const allLangs = await monaco.languages.getLanguages()
  const { conf, language: jsLang } = await allLangs.find(({ id }) => id ==='javascript').loader()
  for (let key in customTokenizer) {
    const value = customTokenizer[key]
    if (key === "tokenizer") {
      for (let category in value) {
        const tokenDefs = value[category]
        if (!jsLang.tokenizer.hasOwnProperty(category)) {
          jsLang.tokenizer[category] = []
        }
        if (Array.isArray(tokenDefs)) {
          jsLang.tokenizer[category].unshift.apply(jsLang.tokenizer[category], tokenDefs)
        }
      }
    } else if (Array.isArray(value)) {
      if (!jsLang.hasOwnProperty(key)) {
        jsLang[key] = []
      }
      jsLang[key].unshift.apply(jsLang[key], value)
    }
  }
}

const Editor = (props) => {
  const monaco = useMonaco()

  useEffect(async () => {
    if (monaco) {
      monaco.editor.defineTheme("replit", themeData)
      await extendTheme(monaco, {
        tokenizer: {
          root: [
            { include: "custom" }
          ],
          custom: [
            ["=>", "arrow-function"]
          ]
        }
      })
    }
  }, [monaco])

  return (
    <MonacoEditor
      language={props.language || "html"} 
      width="100%" height="calc(100% - 31px)" 
      theme="replit"
      loading=""
      value={props.body}
      onChange={props.setBody}
      options={{
        minimap: {
          enabled: false
        }
      }}
    />
  )

  /**
   * wordWrap: 'wordWrapColumn',
	wordWrapColumn: 40,

	// Set this to false to not auto word wrap minified files
	wordWrapMinified: true,

	// try "same", "indent" or "none"
	wrappingIndent: "indent"
   * 
   */
}

export default Editor