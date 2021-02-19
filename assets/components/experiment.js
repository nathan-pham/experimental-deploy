import Link from "next/link"

const Experiment = ({ project, key }) => {
    const { id, data } = project

    return (
        <article key={`experiment-${key}`} className="experiment">
            <h1>{ data.meta.name }</h1>
            <p>{ data.meta.description }</p>
            <a href={`/${id}`} target="__blank" rel="noreferrer" className="flex align-center justify-center">
                <i className="fas fa-play"></i>
            </a>
        </article>
    )
}

export default Experiment