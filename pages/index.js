import { collections } from "../assets/database/client"
import { setCookie } from "nookies"
import { useState } from "react"
import Link from "next/link"
import Experiment from "../assets/components/cards/experiment"
import Root from "../assets/components/document/root"
import { includes } from "../assets/utils"

const Index = ({ projects }) => {
    const [ input, setInput ] = useState("")
    const filtered = projects.filter(({ data: { meta } }) => includes(input, meta.name) || includes(input, meta.description))

    return (
        <Root>
            <main className="experiment-wrapper">
                <div className="search-box">
                    <div className="flex align-center justify-between">
                        <h1>experiments</h1>
                        <Link href="/api/auth/login">
                            <button className="primary-button">
                                login
                            </button>
                        </Link>
                    </div>

                    <input placeholder="project key words" className="default" onInput={(e) => setInput(e.target.value)} />
                </div>
                {
                    filtered.map((project, i) => (
                        <Experiment project={project} key={`experiment-${i}`} />
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

const getServerSideProps = async () => {
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
            projects: projects.filter(({ data }) => !data.settings.private)
        }
    })
}

export default Index
export { getServerSideProps }