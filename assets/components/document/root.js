import Seo from "./seo"

const Root = ({ meta, children }) => {
    return (
        <>
            <Seo meta={meta}/>
            { children }
        </>
    )
}

export default Root