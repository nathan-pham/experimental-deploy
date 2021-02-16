import { collections } from "./"

const generateDefault = (name) => {
    return ({
        time: Date.now(),
        meta: {
            name,
            description: "no description"
        },
        settings: {
            dependencies: [],
            private: false
        },
        html: "Hello World!",
        css: "/* CSS */",
        js: "// JS"
    })
}

const fetchAll = async () => {
    return { success: await collections.projects.orderBy("time").get() }
}

const fetchProject = async (id) => {
    const document = await collections.projects.doc(id).get()

    return document.exists
        ? { success: document.data() }
        : { error: "project does not exist" }
}

const createProject = async (name="untitled-project", project={}) => {
    const _default = Object.assign({}, generateDefault(name), project)
    const res = await collections.projects.add(_default)

    return ({
        success: {
            data: _default,
            id: res.id    
        }
    })
}

const updateProject = async (id, project) => {
    await collections.projects.doc(id).update(project)
    return ({ 
        success: "updated" 
    })
}

export {
    fetchAll,
    fetchProject,
    updateProject,
    createProject
}