import Link from "next/link"
import { useState } from "react"
import ToggleSwitch from "../toggle"
import query from "../../database/query"

const Project = ({ project, updateSettings }) => {
    const { id, data } = project 
    const [ pinned, setPinned ] = useState(data.settings.pinned)

    const update = (setting, value) => {
        query("project", {
            name: id,
            project: {
                [`settings.${setting}`]: value
            },  
            type: "update"
        })
    }

    return (
        <article className="dashboard-project flex justify-between align-center">
            <div className="flex align-center">
                <div className="star-wrapper" onClick={(e) => {
                    update("pinned", !pinned)
                    updateSettings(id, {
                        pinned: !pinned
                    })
                    setPinned((state) => !state)
                }}>
                    <i className="far fa-star"></i>
                    <i className="fas fa-star" style={{ opacity: pinned ? 1 : null }}></i>
                </div>
                <ToggleSwitch onChange={(e) => {
                    const checked = e.target.checked
                    updateSettings(id, {
                        private: checked
                    })
                    update("private", checked)
                }} initial={data.settings.private} />
                <Link href={`/editor/${id}`}>
                    <span>{ data.meta.name }</span>
                </Link>
            </div>
        </article>
    )
}

/*

 */

export default Project