import { useState, useEffect } from "react"
import query from "../../database/query"

const useTimer = (id, initial, alter) => {
    const [save, setSave] = useState(false)
    const [display, setDisplay] = useState(initial)

    useEffect(() => {
        let timeout

        if(save) {
            setDisplay(save.target.textContent)

            timeout = setTimeout(async () => {
                query("project", {
                    name: id,
                    project: {
                        [`meta.${alter}`]: save.target.textContent
                    },  
                    type: "update"
                })

                setSave(false)
            }, 2000)
        }

        return () => clearTimeout(timeout)
    }, [save, display])

    return [display, setSave]
}

export default useTimer