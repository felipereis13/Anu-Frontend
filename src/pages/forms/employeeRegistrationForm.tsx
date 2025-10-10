import employeeRegistrationFormCss from "./employeeRegistrationForm.module.css"
import { Nav } from "../../Components/Nav/Nav"
import { HeaderSearch } from "../../Components/search/Search"
export function EmployeeRegistrationForm() {
  return (
    <div className={employeeRegistrationFormCss.wrapper}>
      <div>
        <HeaderSearch />
         <Nav />
      </div>
    </div>
  )
}
