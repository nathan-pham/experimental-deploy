import { encodeParams, btoa } from "../../../assets/utils"

const handle = (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?${encodeParams({
        client_id: process.env.github_id,
        redirect_uri: process.env.github_redirect,
        state: btoa(((Math.random() * 10) + 5).toString())
    })}`)
}

export default handle