import Split from "react-split"
import { useState, useEffect } from "react"
import { SettingsProvider } from "../../assets/components/settings"
import Editor from "../../assets/components/editor/monaco"
import Header from "../../assets/components/editor/header"
import Root from "../../assets/components/document/root"
import Error from "../../assets/components/error"
import query from "../../assets/database/query"
const half = 50
const third = 100 / 3

const flexBasis = (_, size, gutterSize) => {
    const v = `calc(${size}vh - 5rem - ${gutterSize}px)`
    return ({
        "flex": `1 1 ${v}`,
        "height": v
    })
}

const generateCode = (project) => {
    return (`
        <!DOCTYPE html>
        <head lang="en">
            <style>${project.css}</style>
            <script type="module">${project.js}</script>
        </head>
        <body>
            ${project.html}
        </body>
    `)
}

const ProjectEditor = ({ id }) => {
    const [project, setProject] = useState({ loading: true })
    const [save, setSave] = useState(false)

    useEffect(() => {
      let timeout
    
      if(save) {
        const [type, code] = save

        timeout = setTimeout(async () => {
            setProject((state) => ({
                ...state,
                [type]: code
            }))

            query("project", {
                name: id,
                project: {
                    [type]: code
                },  
                type: "update"
            })

            setSave(false)
        }, 2000)
      }

      return () => clearTimeout(timeout)
    }, [save, project])
    
    useEffect(async () => {
        const res = await query("project", {
            name: id,
            type: "fetch"
        })
        res.hasOwnProperty("success")
            ? setProject(res.success)
            : setProject(res)
    }, [])

    return (
        <Root>
            {
                project.loading
                    ? <></>
                    : project.error
                        ? <Error />
                        : (
                            <SettingsProvider settings={project.settings}>
                                <Header id={id} name={project.meta.name} description={project.meta.description} />
                                <Split sizes={[half, half]} direction="vertical" className="editor fade-in flex direction-column" gutterSize={8} elementStyle={flexBasis}>
                                    <Split sizes={[ third, third, third ]} direction="horizontal" className="flex direction-row half" gutterSize={8}>
                                        <div className="container code">
                                            <header>HTML</header>
                                            <Editor language="html" body={project.html} setBody={(code) => setSave(["html", code])}/>
                                        </div>
                                        <div className="container code">
                                            <header>CSS</header>
                                            <Editor language="css" body={project.css} setBody={(code) => setSave(["css", code])}/>
                                        </div>
                                        <div className="container code">
                                            <header>JS</header>
                                            <Editor language="javascript" body={project.js} setBody={(code) => setSave(["js", code])}/>
                                        </div>
                                    </Split>
                                    <div className="container iframe-wrapper">
                                        <iframe srcDoc={ generateCode(project) }></iframe>
                                    </div>
                                </Split>
                            </SettingsProvider>
                        )
            }
        </Root>
    )
}

const getServerSideProps = async ({ params }) => {
    const { id } = params

    return ({
        props: {
            id
        }
    })
}

export default ProjectEditor
export { getServerSideProps }