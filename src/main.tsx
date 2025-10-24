import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { MantineProvider } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"
import dayjs from "dayjs"


//rotas
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/Login/Login.tsx"
import  Error  from "./pages/Erro404/NotFoundPage.tsx"
import TestPage from "./Components/employeeModal/testPage.tsx"
import { UserSettings } from "./pages/UserSettings/UserSettings.tsx"

dayjs.locale("pt-br")


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
    path: "/userset",
    element: <UserSettings/>
  },
  {
    path: "/testpage",
    element: <TestPage />,
  }
  /*   {
    path: "/funcionario",
    element: <Funcionario />,
  },*/
])

// fim de rotas

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <DatesProvider settings={{ locale: "pt-br", firstDayOfWeek: 0 }}></DatesProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
)
