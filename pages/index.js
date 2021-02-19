import { collections } from "../assets/database/client"
import { setCookie } from "nookies"
import { useState } from "react"
import Link from "next/link"
import Root from "../assets/components/document/root"
import Experiment from "../assets/components/experiment"

const includes = (input, data) => {
    const words = input.split(' ')
    for(const word of words) {
        if(data.includes(word)) {
            return true
        }
    }
    return false
}

const Index = ({ projects }) => {
    const [ input, setInput ] = useState("")

    return (
        <Root>
            <div className="experiment-wrapper">
                <div className="search-box">
                    <div className="flex align-center justify-between">
                        <h1>experiments</h1>
                        <Link href="/login">
                            <button className="primary-button">
                                <i className="fas fa-plus"></i>
                            </button>
                        </Link>
                    </div>

                    <input placeholder="project key words" className="default" onInput={(e) => setInput(e.target.value)} />
                </div>
                {
                    projects.filter((project) => {
                        const { data: { meta } } = project
                        return includes(input, meta.name) || includes(input, meta.description)
                    }).map((project, i) => (
                        <Experiment project={project} index={i} />
                    ))
                }
            </div>
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
            projects
        }
    })
}

export default Index
export { getServerSideProps }