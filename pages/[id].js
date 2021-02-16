import { collections } from "../assets/database/client"
import Root from "../assets/components/document/root"
import Error from "../assets/components/error"
import { generateCode } from "../assets/utils"

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
                        <iframe srcDoc={generateCode(fetchedProject)}></iframe>
                    </div>
                </Root>
            )
        
    )
}

const getServerSideProps = async ({ params }) => {
    const { id } = params

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