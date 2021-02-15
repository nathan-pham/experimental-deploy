import "../assets/styles/globals.css"
import "../assets/styles/editor.css"
import "../assets/styles/error.css"
import "../assets/styles/flex.css"

const App = ({ Component, pageProps }) => {
  return <Component { ...pageProps } />
}

export default App