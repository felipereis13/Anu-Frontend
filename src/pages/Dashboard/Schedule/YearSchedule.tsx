/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from '@mantine/core';
import { useMemo } from 'react';
import classes from './YearSchedule.module.css';
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

function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number) {
    return new Date(year, month, 1).getDay();
}

function YearHeader({ year }: { year: number }) {
    return (
        <div className={classes.yearHeader}>
            <Text className={classes.yearTitle}>{year}</Text>
        </div>
    );
}

function MiniMonth({ month, year, tasksToDisplay, selectedEmployees, employees }: { month: number, year: number, tasksToDisplay: Task[], selectedEmployees: Set<string>, employees: any[] }) {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);

    const employeesToShow = selectedEmployees.size > 0 
        ? employees.filter(emp => selectedEmployees.has(emp.name))
        : employees;

    return (
        <div className={classes.miniMonth}>
            <Text className={classes.miniMonthTitle}>{getMonthName(month)}</Text>

            <div className={classes.miniWeekDaysHeader}>
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => (
                    <div key={day} className={classes.miniWeekDayCell}>
                        <Text className={classes.miniWeekDayText}>{day}</Text>
                    </div>
                ))}
            </div>

            <div className={classes.miniDaysGrid}>
                {/* Células vazias para dias anteriores */}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className={classes.miniDayCell}></div>
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

                    const hasTasksForSelectedEmployees = dayTasks.some(task => 
                        employeesToShow.some(emp => emp.name === task.employeeName)
                    );

                    return (
                        <div 
                            key={day} 
                            className={`${classes.miniDayCell} ${isToday ? classes.miniToday : ''} ${hasTasksForSelectedEmployees ? classes.miniHasTask : ''}`}
                            title={`${day}/${month + 1}`}
                        >
                            <Text className={classes.miniDayNumber}>{day}</Text>
                            {dayTasks.length > 0 && (
                                <div className={classes.miniTaskIndicator}>
                                    {dayTasks.length}
                                </div>
                            )}
                        </div>
                    );
                })}

                {Array.from({ length: 42 - (firstDay + daysInMonth) }).map((_, i) => (
                    <div key={`empty-after-${i}`} className={classes.miniDayCell}></div>
                ))}
            </div>
        </div>
    );
}

function YearGrid({ year, tasksToDisplay, selectedEmployees, employees }: { year: number, tasksToDisplay: Task[], selectedEmployees: Set<string>, employees: any[] }) {
    return (
        <div className={classes.yearGrid}>
            {Array.from({ length: 12 }).map((_, monthIndex) => (
                <MiniMonth 
                    key={monthIndex}
                    month={monthIndex}
                    year={year}
                    tasksToDisplay={tasksToDisplay}
                    selectedEmployees={selectedEmployees}
                    employees={employees}
                />
            ))}
        </div>
    );
}

// Componente principal
export function YearSchedule({ currentDate, selectedEmployees, selectedCategories, selectedCompanies }: { currentDate: Date, selectedEmployees: Set<string>, selectedCategories?: Set<string>, selectedCompanies?: Set<string> }) {
    const { employees } = useEmployees();
    const { allocations } = useAllocations();
    const year = currentDate.getFullYear();

    const tasksToDisplay = useMemo(() => {
        const yearStart = new Date(year, 0, 1);
        const yearEnd = new Date(year, 11, 31);
        
        yearStart.setHours(0, 0, 0, 0);
        yearEnd.setHours(23, 59, 59, 999);
        
        return allocations.filter((task: Task) => {
            const taskStart = parseDateString(task.startDate);
            const taskEnd = parseDateString(task.endDate);
            
            taskStart.setHours(0, 0, 0, 0);
            taskEnd.setHours(23, 59, 59, 999);
            
            // Verifica se a tarefa intersecta com o ano
            const intersects = taskStart <= yearEnd && taskEnd >= yearStart;
            if (!intersects) return false;
            
            if (selectedCompanies && selectedCompanies.size > 0 && !selectedCompanies.has(task.company)) return false;
            return true;
        });
    }, [year, selectedCategories, selectedCompanies, allocations]);

    return (
        <div className={classes.yearScheduleContainer}>
            <YearHeader year={year} />
            <YearGrid year={year} tasksToDisplay={tasksToDisplay} selectedEmployees={selectedEmployees} employees={employees} />
        </div>
    );
}
