const handle = (req, res) => {
    res.send(JSON.stringify(req.params, null, 2))
}

export default handle