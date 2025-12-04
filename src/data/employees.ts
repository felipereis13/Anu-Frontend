// src/data/employees.ts

// 1. Definição da Interface (Mover de SideBar.tsx)
// src/data/employees.ts
export interface Employee {
    name: string;
    role: string;
    company: string;
    companyColor: string;
}

export const employeesData: Employee[] = [
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
];

export interface Allocation {
    id: string;
    employeeName: string;
    company: string;
    title?: string; // optional descriptive title for the allocation
    startDate: string; 
    endDate: string;   
    color: string;    
}

// Allocations represent an employee being assigned to a company for a period.
export const allocationsData: Allocation[] = [
    {
        id: '1',
        employeeName: 'Rayo Mello',
        company: 'Google',
        title: 'Alocado na Google',
        startDate: '2025-12-02',
        endDate: '2025-12-04',
        color: '#4F46E5'
    },
    {
        id: '2',
        employeeName: 'Rayo Mello',
        company: 'Microsoft',
        title: 'Alocado na Microsoft',
        startDate: '2025-12-05',
        endDate: '2025-12-06',
        color: '#DC2626'
    },
    {
        id: '3',
        employeeName: 'Ruthe Maria',
        company: 'Nike',
        title: 'Alocado na Nike',
        startDate: '2025-11-01',
        endDate: '2025-11-05',
        color: '#059669' 
    },
    {
        id: '4',
        employeeName: 'Bruno Vieira',
        company: 'Amazon',
        title: 'Alocado na Amazon',
        startDate: '2025-12-02',
        endDate: '2025-12-04',
        color: '#DC2626'
    },
    {
        id: '5',
        employeeName: 'Beatriz Fordes',
        company: 'Apple',
        title: 'Alocado na Apple',
        startDate: '2025-12-08',
        endDate: '2025-12-15',
        color: '#7C3AED'
    },
    {
        id: '6',
        employeeName: 'Daniel José',
        company: 'Shopify',
        title: 'Alocado na Shopify',
        startDate: '2025-11-01',
        endDate: '2025-12-25',
        color: '#EA580C' 
    }
];