import { createContext, useState, useContext, type ReactNode } from 'react';

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
    const [employees, setEmployees] = useState<Employee[]>([
        { 
            name: "Rayo Mello", 
            role: "Front-End", 
            company: "ACCENTURE", 
            companyColor: '#EBE7E1' 
        },
        { 
            name: "Ruthe Maria", 
            role: "Brand Marc", 
            company: "Mesa Tech", 
            companyColor: '#EBE7E1' 
        },
        { 
            name: "Bruno Vieira", 
            role: "Developer", 
            company: "Office FTC", 
            companyColor: '#EBE7E1' 
        },
        { 
            name: "Beatriz Fordes", 
            role: "Designer", 
            company: "CESAR", 
            companyColor: '#EBE7E1' 
        },
        { 
            name: "Daniel José", 
            role: "Web. Dev", 
            company: "Tech Solutions", 
            companyColor: '#EBE7E1' 
        },
    ]);

    const addEmployee = (employee: Employee) => {
        setEmployees(prev => [...prev, employee]);
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployees() {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployees must be used within EmployeeProvider');
    }
    return context;
}
