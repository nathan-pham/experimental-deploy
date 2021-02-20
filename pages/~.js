import Cookie from "cookies"
import { useState } from "react"
import Project from "../assets/components/cards/project"
import Root from "../assets/components/document/root"
import { collections } from "../assets/database/client"
import { includes } from "../assets/utils"
import validate from "../assets/validate"

const Dashboard = ({ fetchedProjects }) => {
    const [ input, setInput ] = useState("")
    const [ projects, setProjects ] = useState(fetchedProjects)

    const updateSettings = (toFind, settings) => {
        const found = projects.find(({ id }) => id == toFind)
        const filtered = projects.filter(p => p !== found)

        if(found) {
            found.data.settings = Object.assign({}, found.data.settings, settings)

            setProjects([
                ...filtered,
                found
            ])
        }
    }

    const filtered = projects
        .sort((a, b) => {
            if(a.data.settings.pinned < b.data.settings.pinned) {
                return -1
            }
            else if(a.data.settings.pinned > b.data.settings.pinned) {
                return 1
            }
            return 0
        })
        .filter(({ data: { meta } }) => includes(input, meta.name) || includes(input, meta.description))

    return (
        <Root>
            <main className="dashboard-wrapper">
                <div className="search-box">
                    <div className="flex align-center justify-between">
                        <h1>dashboard</h1>
                        <button className="primary-button">
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <input placeholder="project key words" className="default" onInput={(e) => setInput(e.target.value)} />
                </div>
                {
                    filtered.map((project, i) => (
                        <Project project={project} key={`project-${i}`} updateSettings={updateSettings} />
                    ))
                }
                {
                    filtered.length == 0
                        ? <p className="no-experiments">no experiments found</p>
                        : <></>
                }
            </main>
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