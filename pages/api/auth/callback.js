import Cookies from "cookies"
import fetch from "node-fetch"
import { encodeParams } from "../../../assets/utils"
import validate from "../../../assets/validate"

const handle = async (req, res) => {
    const cookies = new Cookies(req, res)
    const state = cookies.get("state")

    if(state !== req.query.state) {
        cookies.set("state")
        res.send("forged state")
        return
    }

    const { access_token } = await fetch(`https://github.com/login/oauth/access_token?${encodeParams({
        client_id: process.env.github_id,
        client_secret: process.env.github_secret,
        code: req.query.code,
        state
    })}`, {
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    }).then(res => res.json())

    cookies.set("state")

    const valid = await validate(access_token)

    if(valid) {
        cookies.set("access_token", access_token)
        res.redirect("/~")
    }
    else {
        res.redirect('/')
    }
}

export default handle