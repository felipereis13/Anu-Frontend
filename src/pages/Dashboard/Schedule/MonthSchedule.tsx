/* eslint-disable @typescript-eslint/no-explicit-any */
// MonthSchedule.tsx
import { Text, Box } from '@mantine/core';
import { useMemo } from 'react';
import classes from './MonthSchedule.module.css';
import type { Allocation as Task } from '../../../data/employees';
import { useEmployees } from '../../../context/EmployeeContext';
import { useAllocations } from '../../../context/useAllocations';

// Helper function to parse date string and get date components
function parseDateString(dateStr: string) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function getMonthName(month: number) {
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    return months[month];
}

function getDaysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

// Cabeçalho do mês
function MonthHeader({ date }: { date: Date }) {
    const monthName = getMonthName(date.getMonth());
    const year = date.getFullYear();

    return (
        <div className={classes.monthHeader}>
            <Text className={classes.monthTitle}>
                {monthName} {year}
            </Text>
        </div>
    );
}

// Grid de dias do mês
function MonthGrid({ date, tasksToDisplay, selectedEmployees, employees }: { date: Date, tasksToDisplay: Task[], selectedEmployees: Set<string>, employees: any[] }) {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const month = date.getMonth();
    const year = date.getFullYear();

    // Se há filtros, mostrar apenas funcionários filtrados
    const employeesToShow = selectedEmployees.size > 0 
        ? employees.filter(emp => selectedEmployees.has(emp.name))
        : employees;

    // Calcular quantas semanas o mês tem
    const totalCells = firstDay + daysInMonth;

    return (
        <div className={classes.monthContainer}>
            {/* Cabeçalho com dias da semana */}
            <div className={classes.weekDaysHeader}>
                {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(day => (
                    <div key={day} className={classes.weekDayCell}>
                        <Text className={classes.weekDayText}>{day}</Text>
                    </div>
                ))}
            </div>

            {/* Grid de dias */}
            <div className={classes.daysGrid}>
                {/* Células vazias para dias anteriores */}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className={classes.dayCell}></div>
                ))}

                {/* Dias do mês */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
                    
                    // Tarefas deste dia
                    const dayTasks = tasksToDisplay.filter(task => {
                        const taskStart = parseDateString(task.startDate);
                        const taskEnd = parseDateString(task.endDate);
                        const currentDay = new Date(year, month, day);
                        
                        taskStart.setHours(0, 0, 0, 0);
                        taskEnd.setHours(23, 59, 59, 999);
                        currentDay.setHours(0, 0, 0, 0);
                        
                        return currentDay >= taskStart && currentDay <= taskEnd;
                    });

                    return (
                        <div 
                            key={day} 
                            className={`${classes.dayCell} ${isToday ? classes.today : ''}`}
                        >
                            <Text className={classes.dayNumber}>{day}</Text>
                            
                            <div className={classes.tasksInDay}>
                                {dayTasks.map(task => {
                                    const empIndex = employeesToShow.findIndex(emp => emp.name === task.employeeName);
                                    if (empIndex === -1) return null;
                                    
                                    return (
                                        <Box
                                            key={task.id}
                                            className={classes.monthTaskTag}
                                            style={{ backgroundColor: task.color }}
                                            title={`${task.title} - ${task.employeeName}`}
                                        >
                                            <Text className={classes.monthTaskText}>
                                                {task.title.length > 12 ? task.title.substring(0, 12) + '...' : task.title}
                                            </Text>
                                        </Box>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {/* Células vazias para dias posteriores */}
                {Array.from({ length: 42 - totalCells }).map((_, i) => (
                    <div key={`empty-after-${i}`} className={classes.dayCell}></div>
                ))}
            </div>
        </div>
    );
}

// Componente principal
export function MonthSchedule({ currentDate, selectedEmployees, selectedCategories, selectedCompanies }: { currentDate: Date, selectedEmployees: Set<string>, selectedCategories?: Set<string>, selectedCompanies?: Set<string> }) {
    const { employees } = useEmployees();
    const { allocations } = useAllocations();
    // Filtrar tarefas do mês
    const tasksToDisplay = useMemo(() => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);
        
        monthStart.setHours(0, 0, 0, 0);
        monthEnd.setHours(23, 59, 59, 999);

        return allocations.filter((task: Task) => {
            const taskStart = parseDateString(task.startDate);
            const taskEnd = parseDateString(task.endDate);
            
            taskStart.setHours(0, 0, 0, 0);
            taskEnd.setHours(23, 59, 59, 999);
            
            // Verifica se a tarefa intersecta com o mês
            const intersects = taskStart <= monthEnd && taskEnd >= monthStart;
            if (!intersects) return false;

            if (selectedCompanies && selectedCompanies.size > 0 && !selectedCompanies.has(task.company)) return false;

            return true;
        });
    }, [currentDate, selectedCategories, selectedCompanies, allocations]);

    return (
        <div className={classes.monthScheduleContainer}>
            <MonthHeader date={currentDate} />
            <MonthGrid date={currentDate} tasksToDisplay={tasksToDisplay} selectedEmployees={selectedEmployees} employees={employees} />
        </div>
    );
}
