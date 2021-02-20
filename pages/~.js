import Cookie from "cookies"
import { useState } from "react"
import { useRouter } from "next/router"
import generate from "project-name-generator"
import Root from "../assets/components/document/root"
import Project from "../assets/components/cards/project"
import { collections } from "../assets/database/client"
import query from "../assets/database/query"
import { includes } from "../assets/utils"
import validate from "../assets/validate"

const Dashboard = ({ fetchedProjects }) => {
    const router = useRouter()

    const [ input, setInput ] = useState("")
    const [ projects, setProjects ] = useState(fetchedProjects)

    const createProject = async () => {
        const { success } = await query("project", {
            type: "create",
            name: generate({ words: 3, alliterative: true }).dashed
        })

        if(success) {
            router.push(`/editor/${success.id}`)
        }
    }

    const updateSettings = (toFind, settings) => {
        const i = projects.findIndex(({ id }) => id == toFind)
        if(i > -1) {
            setProjects((state) => {
                state[i].data.settings = Object.assign({}, state[i].data.settings, settings)
                return state
            })
        }
    }

    const filtered = projects.filter(({ data: { meta } }) => includes(input, meta.name) || includes(input, meta.description))

    return (
        <Root>
            <main className="dashboard-wrapper">
                <div className="search-box">
                    <div className="flex align-center justify-between">
                        <h1>dashboard</h1>
                        <button className="primary-button" onClick={createProject}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <input placeholder="project key words" className="default" onInput={(e) => setInput(e.target.value)} />
                </div>
                {
                    filtered.map((project, i) => (
                        <Project project={project} key={`project-${Math.random()}`} updateSettings={updateSettings} />
                    ))
                }
                {
                    filtered.length == 0
                        ? <p className="no-experiments">no experiments found</p>
                        : <></>
                }
            </main>
            <footer className="copyright">nathan pham</footer>
        </Root>
    )
}

const getServerSideProps = async ({ req, res }) => {
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

    const snapshot = await collections.projects.get()
    const projects = []

    snapshot.forEach((snap) => {
        projects.push({
            id: snap.id,
            data: snap.data()
        })
    })

    return ({
        props: {
            fetchedProjects: projects
        }
    })
}

export default Dashboard
export { getServerSideProps }