import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"

import { MantineProvider } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"
import '@mantine/core/styles.css'; 
import '@mantine/dates/styles.css';

// Dayjs Configuration
import dayjs from "dayjs"
import 'dayjs/locale/pt-br'
dayjs.locale("pt-br")

// Router Imports
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/Login/Login.tsx"
import Error from "./pages/Erro404/NotFoundPage.tsx"
import TestPage from "./Components/employeeModal/testPage.tsx"
import { DashboardPage } from "./pages/Dashboard/DashboardPage.tsx"
import { EmployeeProvider } from "./context/EmployeeContext.tsx"


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
    path: "/testpage",
    element: <TestPage />,
  },
  {
    path:"/cronograma",
    element: <DashboardPage />
  }
  
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EmployeeProvider>
      <MantineProvider>
        <DatesProvider settings={{ locale: "pt-br", firstDayOfWeek: 0 }}>
          <RouterProvider router={router} />
        </DatesProvider>
      </MantineProvider>
    </EmployeeProvider>
  </StrictMode>
)