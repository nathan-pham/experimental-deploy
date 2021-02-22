const types = {
    "css": (href) => `<link href="${href}" rel="stylesheet" />`,
    "js": (src) => `<script src="${src}"></script>`
}

const generateDependencies = (links) => {
    let dependencies = []
    links.filter(v => v.length).forEach(dependency => {
        const extension = dependency.split('.').pop()
        dependencies.push(
            types[extension](dependency)
        )
    })

    return dependencies.join("\n")
}

const generateCode = (project) => {
    return (`
        <!DOCTYPE html>
        <head lang="en">
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
            ${project.html}
            ${ generateDependencies(project.settings.dependencies) }
            <style>${project.css}</style>
            <script ${ project.js.trim().startsWith("import") ? 'type="module"' : '' }>${project.js}</script>
        </body>
    `)
}

const atob = a => Buffer.from(a, "base64").toString("binary")

const btoa = b => Buffer.from(b).toString("base64")

const encodeParams = (params) => (
  Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')
)

const includes = (input, data) => {
    const words = input.trim().split(' ')
    for(const word of words) {
        if(data.includes(word)) {
            return true
        }
    }
    return false
}

export {
    generateCode,
    encodeParams,
    includes,
    atob,
    btoa
}