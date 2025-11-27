import { Home } from "./pages/Home/Home"
import { UserSettings } from "./pages/UserSettings/UserSettings"
// Mantine global styles are provided via MantineProvider in `main.tsx`.
// Importing a non-existent styles file can cause issues; removed.

function App() {
  return (
    <div className="App">
      <Home />    
      <UserSettings />
    </div>
  )
}

export default App
