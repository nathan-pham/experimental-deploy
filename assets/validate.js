const fetch = require("node-fetch")

const validate = async (access_token) => {
    if(!access_token) {
        return false
    }
    
    const { login } = await fetch("https://api.github.com/user", {
        headers: {
            Accept: "application/json",
            Authorization: `token ${access_token}`
        }
    }).then(res => res.json())

    return login == "nathan-pham"
}

export default validate