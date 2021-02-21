import { collections } from "./"

const defaultProject = (name) => {
    return ({
        time: Date.now(),
        meta: {
            name,
            description: "no description"
        },
        settings: {
            dependencies: [],
            private: false,
            pinned: false
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

const createProject = async (name="untitled-project", id) => {
    let project = {}

    if(id) {
        const document = await collections.projects.doc(id).get()

        if(document.exists) {
            project = document.data()
            project.meta.name += "-fork"
        }
    }

    const res = await collections.projects.add(Object.assign({}, defaultProject(name), project))

    return ({
        success: {
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

const deleteProject = async (id) => {
    await collections.projects.doc(id).delete()
    return ({
        success: "deleted"
    })
}

export {
    fetchAll,
    fetchProject,
    updateProject,
    createProject,
    deleteProject
}