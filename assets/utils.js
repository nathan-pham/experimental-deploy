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
            ${ generateDependencies(project.settings.dependencies) }
            <style>${project.css}</style>
            <script type="module">${project.js}</script>
        </head>
        <body>
            ${project.html}
        </body>
    `)
}

export {
    generateCode
}