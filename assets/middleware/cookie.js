import run from "./run"

const parse = str => {
    return !str ? {} : str.split(';').map(v => v.split('=')).reduce((acc, v) => {
		acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
		return acc
	}, {})
}

const cookie = (req, res, next) => {
    req.cookie = parse(req.headers.cookie) 
    req.clearCookie = (name) => {
        res.setHeader("Set-Cookie", `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`)    
    }
    next()
}

const handle = (req, res) => {
    return run(req, res, cookie)
}

export default handle