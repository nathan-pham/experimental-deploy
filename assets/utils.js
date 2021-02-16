const generateCode = (project) => {
    return (`
        <!DOCTYPE html>
        <head lang="en">
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