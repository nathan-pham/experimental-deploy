import Root from "../../components/document/root"

const Editor = (props) => {
    return (
        <Root title="Profile">
            { JSON.stringify(props) }
        </Root>
    )
}

const getServerSideProps = async ({ params }) => {
    const { project } = params
    return (
        {
            props: {
                project
            }
        }
    )
}

export default Editor
export { getServerSideProps }