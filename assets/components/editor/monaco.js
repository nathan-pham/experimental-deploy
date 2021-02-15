import MonacoEditor from "@monaco-editor/react"

const Editor = (props) => {
    return (<MonacoEditor
        language={props.language || "html"} 
        width="100%" height="100%" 
        theme="vs-abyss"
        loading=""
        value={props.body}
        onChange={props.setBody}
        options={{
          minimap: {
            enabled: false
          }
        }}
    />)
}

export default Editor