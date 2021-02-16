import { setCookie } from "nookies"
import Root from "../assets/components/document/root"

const Index = () => {
  return (
    <Root></Root>
  )
}

const getServerSideProps = async () => {
  return ({
    props: {}
  })
}


export default Index
export { getServerSideProps }