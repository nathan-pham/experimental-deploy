import { collections } from "../assets/database/client"
import Root from "../assets/components/document/root"
import Error from "../assets/components/error"
import { generateCode } from "../assets/utils"
import * as jsdom from "jsdom"
const { JSDOM } = jsdom

const ProjectEditor = ({ id, fetchedProject }) => {
    return (
        fetchedProject.error
            ? (
                <Root meta={{ name: "Project not found" }}>
                    <Error />
                </Root>
            )
            : (
                <Root meta={fetchedProject.meta}>
                    <div className="iframe-wrapper">
                        {
                            fetchedProject.repl
                                ? <iframe src={fetchedProject.repl}></iframe>
                                : <iframe srcDoc={generateCode(fetchedProject)}></iframe>
                        }
                    </div>
                </Root>
            )
        
    )
}

const getServerSideProps = async ({ params }) => {
    const { id } = params

    const document = await collections.projects.doc(id).get()
    let project = document.exists ? document.data() : { error: "project not found" }
    
    if(!document.exists) {
        const repl = `https://${Buffer.from(id, "base64").toString("binary")}.phamn23.repl.co/`
        const res = await fetch(repl).catch(e => ({ status: 404 }))

        if(res.status == 200) {
            const body = await res.text()
            const replDocument = new JSDOM(body).window.document
            project = {
                repl,
                name: replDocument.querySelector("title").textContent,
                description: replDocument.querySelector("meta[name='description']").getAttribute("content"),
            }
        }
        else {
            project = { error: "project not found" }
        }
    }

    return ({
        props: {
            id,
            fetchedProject: project
        }
    })
}

export default ProjectEditor
export { getServerSideProps }