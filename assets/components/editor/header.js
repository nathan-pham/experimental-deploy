import Link from "next/link"
import { useState } from "react"
import arrayMove from "array-move"
import Modal from "../modal"
import useTimer from "./timer"
import ToggleSwitch from "../toggle"
import query from "../../database/query"
import { useSettings } from "../settings"
import { SortableItem, SortableContainer } from "../dependency"

const Header = ({ id, name, description }) => {
    const [_name, setName] = useTimer(id, "name")
    const [_description, setDescription] = useTimer(id, "description")
    const [visible, setVisible] = useState(false)
    const [settings, setSettings] = useSettings()
    
    const toggle = () => setVisible(state => !state) 

    const update = (setting, value) => {
        query("project", {
            name: id,
            project: {
                [`settings.${setting}`]: value
            },  
            type: "update"
        })
    }

    const addDependency = (e) => {
        if(e.key.toLowerCase() == "enter") {
            const dependency = e.target.value

            if(!settings.dependencies.includes(dependency) && /^http[\S]+\.[|js|css]/.test(dependency)) {
                e.target.value = ""
                const dependencies = [dependency, ...settings.dependencies]
                setSettings(state => ({
                    ...state,
                    dependencies
                }))
                update("dependencies", dependencies)
            }
        }
    }

    const removeDependency = (index) => {
        const dependencies = settings.dependencies.filter(v => v !== settings.dependencies[index])
        setSettings(state => ({
            ...state,
            dependencies
        }))
        update("dependencies", dependencies)
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const dependencies = arrayMove(settings.dependencies, oldIndex, newIndex)
        setSettings(state => ({
            ...state,
            dependencies
        }))
        update("dependencies", dependencies)
    }

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
                    <div className="flex justify-between align-center" style={{margin: "0 0 1rem 0"}}>
                        <a href={`/${id}`} target="__blank" rel="noreferrer">
                            <button className="primary-button"><i className="fas fa-link"></i>Open preview</button>
                        </a>
                        <button className="secondary-button"><i className="fas fa-code-branch"></i>Fork</button>
                    </div>
                    <input className="default" placeholder="Enter a dependency" type="text" style={{margin: "0 0 1rem 0"}} onKeyDown={addDependency}></input>
                    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                        {
                            settings.dependencies.filter(v => v.length).map((v, i) => (
                                <SortableItem key={`dependency-${i}`} index={i} className="flex align-center dependency" style={{ zIndex: 20 }}>
                                    <span>{v}</span>
                                    <i key={i} className="fas fa-minus-circle remove" onClick={(e) => {
                                        e.stopPropagation()
                                        removeDependency(i)
                                    }}></i>
                                </SortableItem>
                            ))
                        }
                    </SortableContainer>
                    <div className="flex justify-between align-center">
                        <span className="label">{ settings.private ? "Only you can see this experiment" : "Anyone can see this experiment" }</span>
                        <ToggleSwitch onChange={(e) => {
                            const checked = e.target.checked

                            setSettings(state => ({
                                ...state,
                               private: checked
                            }))

                            update("private", checked)
                        }} initial={settings.private} />
                    </div>
                    <button className="danger-button" style={{margin: "1rem 0 0 0"}}><i className="fas fa-trash-alt"></i> Delete project</button>
                </Modal>
            ) : null }
        </>
    )
}

export default Header