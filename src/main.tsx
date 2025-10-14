import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { MantineProvider } from "@mantine/core"

//rotas
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/Login/Login.tsx"
import { EmployeeRegistrationForm } from "./pages/forms/employeeRegistrationForm.tsx"
import { Funcionario } from "./pages/funcionario/Funcionario.tsx"

const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/forms",
    element: <EmployeeRegistrationForm />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/funcionario",
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
