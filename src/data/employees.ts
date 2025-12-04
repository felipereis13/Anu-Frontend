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

export interface Task {
    id: string;
    employeeName: string;
    title: string;
    category: 'front' | 'back' | 'design' | 'brand' | 'web';
    company: string;
    startDate: string; 
    endDate: string;   
    color: string;    
}

export const tasksData: Task[] = [
    {
        id: '1',
        employeeName: 'Rayo Mello',
        title: 'Homepage Redesign',
        category: 'front',
        company: 'Google',
        startDate: '2025-12-02',
        endDate: '2025-12-04',
        color: '#4F46E5'
    },
    {
        id: '2',
        employeeName: 'Rayo Mello',
        title: 'API Integration',
        category: 'back',
        company: 'Microsoft',
        startDate: '2025-12-05',
        endDate: '2025-12-06',
        color: '#DC2626'
    },
    {
        id: '3',
        employeeName: 'Ruthe Maria',
        title: 'Brand Identity',
        category: 'brand',
        company: 'Nike',
        startDate: '2025-11-01',
        endDate: '2025-11-05',
        color: '#059669' 
    },
    {
        id: '4',
        employeeName: 'Bruno Vieira',
        title: 'System Architecture',
        category: 'back',
        company: 'Amazon',
        startDate: '2025-12-02',
        endDate: '2025-12-04',
        color: '#DC2626'
    },
    {
        id: '5',
        employeeName: 'Beatriz Fordes',
        title: 'UI/UX Design',
        category: 'design',
        company: 'Apple',
        startDate: '2025-12-08',
        endDate: '2025-12-15',
        color: '#7C3AED'
    },
    {
        id: '6',
        employeeName: 'Daniel José',
        title: 'E-commerce Platform',
        category: 'web',
        company: 'Shopify',
        startDate: '2025-11-01',
        endDate: '2025-12-25',
        color: '#EA580C' 
    }
];

export const categoryColors = {
    front: '#4F46E5', 
    back: '#DC2626',  
    design: '#7C3AED', 
    brand: '#059669', 
    web: '#EA580C'    
};

export const categoryLabels = {
    front: 'FRONT',
    back: 'BACK',
    design: 'DESIGN',
    brand: 'BRAND',
    web: 'WEB'
};