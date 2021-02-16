import { useSettings } from "./settings"
import { generateCode } from "../utils"

const Preview = ({ project }) => {
    const [settings] = useSettings()
    
    return (
        <iframe srcDoc={ generateCode(Object.assign({}, project, { settings })) }></iframe>
    )
}

export default Preview