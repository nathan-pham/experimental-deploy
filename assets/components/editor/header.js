import Link from "next/link"
import { useState, useEffect } from "react"
import query from "../../database/query"

const timerHook = (initial, id, alter) => {
    const [save, setSave] = useState(false)

    useEffect(() => {
        let timeout
    
        if(save) {
            timeout = setTimeout(async () => {
                query("project", {
                    name: id,
                    project: {
                        [`meta.${alter}`]: save.target.textContent
                    },  
                    type: "update"
                })

                setSave(false)
            }, 2000)
        }

        return () => clearTimeout(timeout)
    }, [save])

    return [save, setSave]
}

const Header = ({ id, name, description }) => {
    const [_name, setName] = timerHook(name, id, "name")
    const [_description, setDescription] = timerHook(description, id, "description")

    return (
        <header className="editor-header flex justify-between align-center">
            <div className="flex align-center">
                <Link href="/">
                    <img className="header-icon" src="/icons/apple-icon.png" alt="logo" />
                </Link>
                <div className="meta-container">
                    <h1 className="flex align-center">
                        <span contentEditable={true} suppressContentEditableWarning={true} onKeyPress={setName}>{name}</span>
                        <i className="fas fa-pencil-alt"></i>
                    </h1>
                    <p contentEditable={true} suppressContentEditableWarning={true} onKeyPress={setDescription}>{description}</p>
                </div>
            </div>
            <aside>
                <i className="fas fa-cog option"></i>
            </aside>
        </header>
    )
}

export default Header