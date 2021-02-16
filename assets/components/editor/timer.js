import { useState, useEffect } from "react"
import query from "../../database/query"

const useTimer = (id, alter) => {
    const [save, setSave] = useState(false)

    useEffect(() => {
        let timeout
    
        if(save) {
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
    }, [save])

    return [save, setSave]
}

export default useTimer