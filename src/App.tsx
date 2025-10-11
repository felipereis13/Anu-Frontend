import "@mantine/core/styles.css"
import { Nav } from "./Components/Nav/Nav"
import { HeaderSearch } from "./Components/search/Search"
import NotFoundPage from "./pages/Erro404/Erro"

function App() {
  return (
    <div className="App">
      <HeaderSearch />
      <Nav />
      <NotFoundPage />
    </div>
  )
}

export default App
