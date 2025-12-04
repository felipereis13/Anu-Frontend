/* eslint-disable @typescript-eslint/no-explicit-any */
// MainSchedule.tsx
import { Group, Text, Box } from '@mantine/core';
import { useMemo } from 'react';
import classes from './MainSchedule.module.css';
import { tasksData, categoryLabels } from '../../../data/employees';
import type { Task } from '../../../data/employees';
import { useEmployees } from '../../../context/EmployeeContext';

// Helper function to convert date to YYYY-MM-DD string
function dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getWeekDays(startDate: Date) {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dayIndex = date.getDay();
        const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
        const dateString = dateToString(date);

        days.push({
            day: dayNames[dayIndex],
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            dateString: dateString
        });
    }
    return days;
}

function getMonthName(month: number) {
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    return months[month];
}

function ScheduleHeader({ weekDays }: { weekDays: any[] }) {
    const monthLabel = getMonthName(weekDays[0]?.month);

    return (
        <Group className={classes.headerContainer} wrap="nowrap">
            <Text className={classes.monthLabel}>
                {monthLabel}
            </Text>

            <div className={classes.daysContainer}>
                {weekDays.map((item) => (
                    <Box key={item.dateString} className={classes.dayColumn}>
                        <Text className={classes.dayText}>{item.day}</Text>
                        <Text className={classes.dateText}>{item.date}</Text>
                    </Box>
                ))}
            </div>
        </Group>
    );
}

// Calculate positioning based on grid column widths
function getTaskPosition(startIdx: number, endIdx: number, rowIdx: number) {
    const colWidth = 100 / 7; // Each column is 1/7 of the width
    const left = startIdx * colWidth;
    const width = (endIdx - startIdx + 1) * colWidth;
    const top = rowIdx * 100 + 20;

    return {
        left: `${left}%`,
        width: `${width}%`,
        top: `${top}px`
    };
}

function TaskItem({ 
    task, 
    startDayIndex, 
    endDayIndex, 
    rowIndex 
}: { 
    task: Task;
    startDayIndex: number;
    endDayIndex: number;
    rowIndex: number;
}) {
    const position = getTaskPosition(startDayIndex, endDayIndex, rowIndex);

    return (
        <Box
            className={classes.taskContainer}
            style={{
                left: position.left,
                width: position.width,
                top: position.top,
                backgroundColor: task.color,
            }}
        >
            <div className={classes.taskContent}>
                <Text className={classes.taskTitle}>{task.title}</Text>
                <Text className={classes.taskCompany}>{task.company}</Text>
            </div>

            <Text className={classes.taskCategory}>
                {categoryLabels[task.category]}
            </Text>
        </Box>
    );
}

function ScheduleGrid({ 
    weekDays, 
    tasksToDisplay, 
    selectedEmployees,
    employees
}: { 
    weekDays: any[];
    tasksToDisplay: Task[];
    selectedEmployees: Set<string>;
    employees: any[];
}) {
    const employeesToShow = selectedEmployees.size > 0
        ? employees.filter(emp => selectedEmployees.has(emp.name))
        : employees;

    return (
        <div className={classes.gridContainer} style={{ 
            gridTemplateRows: `repeat(${employeesToShow.length}, 100px)` 
        }}>
            {/* Background grid cells */}
            {employeesToShow.map((_, rowIdx) =>
                weekDays.map((_, colIdx) => (
                    <div
                        key={`cell-${rowIdx}-${colIdx}`}
                        className={classes.gridCell}
                    />
                ))
            )}

            {/* Tasks - positioned absolutely within the grid container */}
            {tasksToDisplay.map(task => {
                const empIndex = employeesToShow.findIndex(emp => emp.name === task.employeeName);
                if (empIndex === -1) return null;

                // Find which column indices this task spans
                let startIdx = -1;
                let endIdx = -1;

                for (let i = 0; i < weekDays.length; i++) {
                    if (weekDays[i].dateString >= task.startDate && startIdx === -1) {
                        startIdx = i;
                    }
                    if (weekDays[i].dateString <= task.endDate) {
                        endIdx = i;
                    }
                }

                // If task doesn't intersect this week, skip it
                if (startIdx === -1 || endIdx === -1 || startIdx > endIdx) {
                    return null;
                }

                return (
                    <TaskItem
                        key={task.id}
                        task={task}
                        startDayIndex={startIdx}
                        endDayIndex={endIdx}
                        rowIndex={empIndex}
                    />
                );
            })}
        </div>
    );
}

export function MainSchedule({
    currentWeekStart,
    selectedEmployees,
    selectedCategories,
    selectedCompanies
}: {
    currentWeekStart: Date;
    selectedEmployees: Set<string>;
    selectedCategories?: Set<string>;
    selectedCompanies?: Set<string>;
}) {
    const { employees } = useEmployees();
    const weekDays = useMemo(() => getWeekDays(currentWeekStart), [currentWeekStart]);

    const tasksToDisplay = useMemo(() => {
        const weekStartStr = weekDays[0]?.dateString;
        const weekEndStr = weekDays[6]?.dateString;

        if (!weekStartStr || !weekEndStr) return [];

        return tasksData.filter(task => {
            // Check if task intersects with week using string comparison
            const taskInWeek = task.startDate <= weekEndStr && task.endDate >= weekStartStr;
            if (!taskInWeek) return false;

            // Category filter
            if (selectedCategories && selectedCategories.size > 0 && !selectedCategories.has(task.category)) {
                return false;
            }

            // Company filter
            if (selectedCompanies && selectedCompanies.size > 0 && !selectedCompanies.has(task.company)) {
                return false;
            }

            return true;
        });
    }, [weekDays, selectedCategories, selectedCompanies]);

    return (
        <div className={classes.mainScheduleContainer}>
            <ScheduleHeader weekDays={weekDays} />
            <ScheduleGrid weekDays={weekDays} tasksToDisplay={tasksToDisplay} selectedEmployees={selectedEmployees} employees={employees} />
        </div>
    );
}
