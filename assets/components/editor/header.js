import { useState } from "react"
import Link from "next/link"
import Modal from "../modal"
import useTimer from "./timer"
import ToggleSwitch from "../toggle"
import { useSettings } from "../settings"

const Header = ({ id, name, description }) => {
    const [_name, setName] = useTimer(id, "name")
    const [_description, setDescription] = useTimer(id, "description")
    const [visible, setVisible] = useState(false)
    const [settings, setSettings] = useSettings()

    const toggle = () => setVisible(state => !state) 

    return (
        <>
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
                    <button className="flex align-center justify-center option" onClick={toggle}>
                        <i className="fas fa-cog"></i>
                    </button>
                </aside>
            </header>
            { visible ? (
                <Modal onClick={toggle}>
                    <h1>Settings</h1>
                    <input />
                    <div className="dependencies"></div>
                    <div className="flex justify-between align-center">
                        <span className="label">Anyone can see this experiment</span>
                        <ToggleSwitch />
                    </div>
                    <button className="delete">Delete project</button>
                </Modal>
            ) : null }
        </>
    )
}

export default Header