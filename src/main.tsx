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
import { DashboardPage } from "./pages/Dashboard/DashboardPage.tsx"
import { EmployeeProvider } from "./context/EmployeeContext.tsx"
import { AuthProvider, RequireAuth } from './context/AuthContext.tsx'
import { AllocationProvider } from "./context/AllocationContext.tsx"
import { Funcionario } from "./pages/Funcionario/Funcionario.tsx"


const router = createBrowserRouter([
  {
    path: "/app",
    element: <RequireAuth><App /></RequireAuth>,
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
    path:"/cronograma",
    element: <RequireAuth><DashboardPage /></RequireAuth>
  },
  {
    path: "/funcionarios",
    element: <RequireAuth><Funcionario /></RequireAuth>
  }
  
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <EmployeeProvider>
        <AllocationProvider>
          <MantineProvider>
            <DatesProvider settings={{ locale: "pt-br", firstDayOfWeek: 0 }}>
              {/* Protect routes that require auth by wrapping elements in the router with <RequireAuth> */}
              <RouterProvider router={router} />
            </DatesProvider>
          </MantineProvider>
        </AllocationProvider>
      </EmployeeProvider>
    </AuthProvider>
  </StrictMode>
)