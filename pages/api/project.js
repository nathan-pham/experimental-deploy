import { createProject, updateProject, fetchProject, deleteProject } from "../../assets/database/project"

const handle = async (req, res) => {
    if(req.method !== "POST" || !req.body) {
        return res.json({ error: "no payload specified" })
    }

    const { name, type, project } = req.body

    switch(type) {
        case "delete":
            res.json(await deleteProject(name))
            break
        case "create":
            res.json(await createProject(name, project))
            break
        case "fetch":
            res.json(await fetchProject(name))
            break
        case "update":
            res.json(await updateProject(name, project))
            break
        default:
            res.json({ error: "invalid type" })      
    }
}

export default handle