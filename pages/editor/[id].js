import Cookie from "cookies"
import Split from "react-split"
import { useState, useEffect } from "react"
import { SettingsProvider } from "../../assets/components/settings"
import { collections } from "../../assets/database/client"
import Editor from "../../assets/components/editor/monaco"
import Header from "../../assets/components/editor/header"
import Root from "../../assets/components/document/root"
import Preview from "../../assets/components/preview"
import Error from "../../assets/components/error"
import query from "../../assets/database/query"
import validate from "../../assets/validate"

const half = 50
const third = 100 / 3

const flexBasis = (_, size, gutterSize) => {
    const v = `calc(${size}vh - 5rem - ${gutterSize}px)`
    return ({
        "flex": `1 1 ${v}`,
        "height": v
    })
}

const ProjectEditor = ({ id, fetchedProject }) => {
    const [project, setProject] = useState(fetchedProject)
    const [save, setSave] = useState(false)

    useEffect(() => {
      let timeout
    
      if(save) {
        const [type, code] = save

        if(type.includes('.')) {
            setProject((state) => ({
                ...state,
                meta: {
                    ...state.meta,
                    [type.split('.').pop()]: code
                }
            }))
        }

        timeout = setTimeout(async () => {
            if(!type.includes('.')) {
                setProject((state) => ({
                    ...state,
                    [type]: code
                }))
            }

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
    }, [save])

    const saveMeta = (meta, type) => {
        setSave([`meta.${type}`, meta])
    }

    return (
        <Root>
            {
                project.error
                    ? <Error />
                    : (
                        <SettingsProvider settings={project.settings}>
                            <Header id={id} meta={project.meta}  saveMeta={saveMeta} />
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
                                    <Preview project={project} />
                                </div>
                            </Split>
                        </SettingsProvider>
                    )
            }
        </Root>
    )
}

const getServerSideProps = async ({ req, res, params }) => {
    const { id } = params
    const cookies = new Cookie(req, res)

    const valid = await validate(cookies.get("access_token"))

    if(!valid) {
        return ({
            redirect: {
                destination: '/',
                permanent: false
            }
        })
    }

    const document = await collections.projects.doc(id).get()
    const project = document.exists ? document.data() : { error: "project not found" }

    return ({
        props: {
            id,
            fetchedProject: project
        }
    })
}

export default ProjectEditor
export { getServerSideProps }