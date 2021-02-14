import Seo from "./seo"

const Root = ({ children }) => {
    return (
        <>
            <Seo />
            { children }
        </>
    )
}