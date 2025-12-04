// DashboardPage.tsx
import { useState, useCallback } from 'react';
import { Nav } from "../../Components/Nav/Nav";
import { HeaderDash } from "./Header/HeaderDash";
import { SideBar } from "./SideBar/SideBar";
import { MainSchedule } from "./Schedule/MainSchedule";
import { MonthSchedule } from "./Schedule/MonthSchedule";
import { YearSchedule } from "./Schedule/YearSchedule";
import { useEmployees } from '../../context/EmployeeContext';

export type ViewType = 'week' | 'month' | 'year';

export function DashboardPage() {
    const { employees } = useEmployees();
    const [viewType, setViewType] = useState<ViewType>('week');
    const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
    
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        // Começa com a semana atual, começando no domingo
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day; // Ajusta para o domingo anterior
        return new Date(today.setDate(diff));
    });

    const [currentDate, setCurrentDate] = useState(new Date());

    // Task filters (companies only)
    const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());

    // Options for header filter controls
    const companyOptions = Array.from(new Set(employees.map(e => e.company))).map(c => ({ value: c, label: c }));

    const handlePrevWeek = useCallback(() => {
        setCurrentWeekStart(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 7);
            return newDate;
        });
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 7);
            return newDate;
        });
    }, []);

    const handleNextWeek = useCallback(() => {
        setCurrentWeekStart(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        });
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        });
    }, []);

    const handleToday = useCallback(() => {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day;
        setCurrentWeekStart(new Date(today.setDate(diff)));
        setCurrentDate(new Date());
    }, []);

    const toggleEmployeeFilter = useCallback((employeeName: string) => {
        setSelectedEmployees(prev => {
            const newSet = new Set(prev);
            if (newSet.has(employeeName)) {
                newSet.delete(employeeName);
            } else {
                newSet.add(employeeName);
            }
            return newSet;
        });
    }, []);

    const clearFilters = useCallback(() => {
        setSelectedEmployees(new Set());
    }, []);

    const handleCompaniesChange = useCallback((values: string[]) => {
        setSelectedCompanies(new Set(values));
    }, []);

    const clearTaskFilters = useCallback(() => {
        setSelectedCompanies(new Set());
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

                <HeaderDash 
                onPrevWeek={handlePrevWeek} 
                onNextWeek={handleNextWeek} 
                onToday={handleToday}
                viewType={viewType}
                onViewChange={setViewType}
                companyOptions={companyOptions}
                selectedCompanies={selectedCompanies}
                
                onCompaniesChange={handleCompaniesChange}
                onClearTaskFilters={clearTaskFilters}
            />

            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>

                <Nav />

                <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>

                    <SideBar 
                        selectedEmployees={selectedEmployees}
                        onToggleEmployee={toggleEmployeeFilter}
                        onClearFilters={clearFilters}
                    />
                    
                    {viewType === 'week' && (
                        <MainSchedule 
                            currentWeekStart={currentWeekStart}
                            selectedEmployees={selectedEmployees}
                            selectedCompanies={selectedCompanies}
                        />
                    )}
                    
                    {viewType === 'month' && (
                        <MonthSchedule 
                            currentDate={currentDate}
                            selectedEmployees={selectedEmployees}
                            selectedCompanies={selectedCompanies}
                        />
                    )}
                    
                    {viewType === 'year' && (
                        <YearSchedule 
                            currentDate={currentDate}
                            selectedEmployees={selectedEmployees}
                            selectedCompanies={selectedCompanies}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}