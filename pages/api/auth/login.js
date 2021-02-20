import Cookies from "cookies"
import { encodeParams, btoa } from "../../../assets/utils"

const handle = (req, res) => {
    const cookies = new Cookies(req, res)
    const state = btoa(((Math.random() * 10) + 5).toString())

    cookies.set("state", state)

    res.redirect(`https://github.com/login/oauth/authorize?${encodeParams({
        client_id: process.env.github_id,
        redirect_uri: process.env.github_redirect,
        state
    })}`)
}

export default handle