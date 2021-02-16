import Root from "../assets/components/document/root"
import Error from "../assets/components/error"

const Error404 = () => {
    return (
        <Root meta={{ name: "Project not found" }}>
            <Error />
        </Root>
    )
}

export default Error404