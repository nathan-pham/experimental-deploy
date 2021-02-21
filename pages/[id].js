import { collections } from "../assets/database/client"
import Root from "../assets/components/document/root"
import Error from "../assets/components/error"
import { generateCode, atob, btoa } from "../assets/utils"
import * as jsdom from "jsdom"

const { JSDOM } = jsdom

const convert = (url, invert) => {
    return invert
        ? atob(url).split('0').filter(v => v.length).join('')
        : btoa(url.padStart(15, '0'))
}

const ProjectEditor = ({ id, fetchedProject }) => {
    return (
        fetchedProject.error
            ? (
                <Root meta={{ name: "project not found" }}>
                    <Error />
                </Root>
            )
            : (
                <Root meta={fetchedProject.meta}>
                    <main className="iframe-wrapper">
                        {
                            fetchedProject.repl
                                ? <iframe src={fetchedProject.repl}></iframe>
                                : <iframe srcDoc={generateCode(fetchedProject)}></iframe>
                        }
                    </main>
                </Root>
            )
        
    )
}

const getServerSideProps = async ({ params }) => {
    const { id } = params

    const document = await collections.projects.doc(id).get()
    let project = document.exists ? document.data() : { error: "project not found" }
    
    if(!document.exists) {
        const repl = `https://${convert(id, true)}.phamn23.repl.co/`
        const res = await fetch(repl).catch(e => ({ status: 404 }))

        if(res.status == 200) {
            const body = await res.text()
            const replDocument = new JSDOM(body).window.document

            try {
                project = {
                    repl,
                    meta: {
                        name: replDocument.querySelector("title").textContent,
                        description: replDocument.querySelector("meta[name='description']").getAttribute("content")
                    }
                }
            }
            catch(e) {
                project = {
                    repl,
                    meta: {
                        name: "repl experiment",
                        description: "no description"
                    }
                }
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