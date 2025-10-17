import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { MantineProvider } from "@mantine/core"

//rotas
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/Login/Login.tsx"
import  Error  from "./pages/Erro404/NotFoundPage.tsx"
import { Funcionario } from "./pages/Funcionario/Funcionario.tsx"


const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
  },

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/erro",
    element: <Error />,
  },
     {
    path: "/Funcionario",
    element: <Funcionario />,
  },
])

// fim de rotas

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
)
