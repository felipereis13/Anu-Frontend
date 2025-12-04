import { createContext, useState, useContext, type ReactNode } from 'react';
import { employeesData } from '../data/employees';

export interface Employee {
    name: string;
    role: string;
    company: string;
    companyColor: string;
}

interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (employee: Employee) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>(() =>
        employeesData.map((e) => ({ ...e }))
    );

    const addEmployee = (employee: Employee) => {
        setEmployees((prev) => [...prev, employee]);
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEmployees() {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployees must be used within EmployeeProvider');
    }
    return context;
}
