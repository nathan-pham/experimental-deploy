import Cookie from "cookies"
import validate from "../validate"
import run from "./run"

const auth = (req, res, next) => {
    const cookies = new Cookie(req, res)
    const valid = await validate(cookies.get("access_token"))

    valid 
        ? next()
        : res.redirect('/')
}

const handle = (req, res) => {
    return run(req, res, auth)
}

export default handle