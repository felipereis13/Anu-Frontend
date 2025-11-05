import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import type { EventInput } from "@fullcalendar/core";
import { Paper, Title } from "@mantine/core";
import styles from "./Agenda.module.css";

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const events: EventInput[] = [
  {
    title: "🚀 Deploy do Front",
    start: `${year}-${month}-${day}T10:00:00`,
    end: `${year}-${month}-${day}T12:00:00`,
    className: styles.frontend,
  },
  {
    title: "📊 Organizar Roadmap",
    start: `${year}-${month}-${Number(day) + 1}T14:00:00`,
    end: `${year}-${month}-${Number(day) + 1}T16:00:00`,
    className: styles.planning,
  },
  {
    title: "🔧 Revisar Pull Request",
    start: `${year}-${month}-${Number(day) + 2}T09:00:00`,
    end: `${year}-${month}-${Number(day) + 2}T10:00:00`,
    className: styles.backend,
  },
  {
    title: "🎨 Design de Interface",
    start: `${year}-${month}-${Number(day) + 3}T11:00:00`,
    end: `${year}-${month}-${Number(day) + 3}T12:30:00`,
    className: styles.design,
  },
  {
    title: "🧪 Testes Automatizados",
    start: `${year}-${month}-${Number(day) + 4}T15:00:00`,
    end: `${year}-${month}-${Number(day) + 4}T16:00:00`,
    className: styles.qa,
  },
];

export default function Agenda() {
  return (
    <Paper shadow="xl" radius="lg" p="xl" className={styles.container}>
      <Title order={2} className={styles.title}>
        Agenda Semanal
      </Title>

      <div className={styles.calendarWrapper}>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            bootstrap5Plugin,
          ]}
          themeSystem="bootstrap5"
          initialView="timeGridWeek"
          events={events}
          editable={true}
          selectable={true}
          height="auto"
          locale="pt-br"
          firstDay={1}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          buttonText={{
            today: "📅 Hoje",
            month: "📅 Mês",
            week: "📅 Semana",
            day: "📅 Dia",
            list: "📋 Lista",
          }}
          dayHeaderFormat={{
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          }}
        />
      </div>
    </Paper>
  );
}