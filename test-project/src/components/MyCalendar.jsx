import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/MyCalendar.css"; // підключаємо стилі

// const events = [
//   {
//     id: "ISgyl5fyhugXvKwOVuT1",
//     name: "fdsf",
//     date: "2025-04-07",
//     importance: "критична",
//     userId: "OxAi7aaaAWZJQkzVtQnAhU9hsJk2",
//     createdAt: {
//       seconds: 1744284832,
//       nanoseconds: 458000000,
//     },
//   },
//   {
//     id: "anotherEvent",
//     name: "Робоча зустріч",
//     date: "2025-04-10",
//     importance: "звичайна",
//     userId: "OxAi7aaaAWZJQkzVtQnAhU9hsJk2",
//     createdAt: {
//       seconds: 1744554832,
//       nanoseconds: 0,
//     },
//   },
//   {
//     id: "anotherEvent",
//     name: "Робоча зустріч",
//     date: "2025-04-23",
//     importance: "звичайна",
//     userId: "OxAi7aaaAWZJQkzVtQnAhU9hsJk2",
//     createdAt: {
//       seconds: 1744554832,
//       nanoseconds: 0,
//     },
//   },
// ];

function MyCalendar(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const groupedEvents = props.events.reduce((acc, event) => {
    const eventDate = new Date(event.date);
    const formattedDate = formatDate(eventDate); // Применшуємо час
    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(event);
    return acc;
  }, {});

  function formatDate(date) {
    const validDate = new Date(date);

    if (isNaN(validDate.getTime())) {
      console.error("Invalid date value: ", date);
      return "";
    }

    return validDate.toLocaleDateString("en-GB");
  }

  const selectedDateStr = formatDate(selectedDate);
  const todayEvents = groupedEvents[selectedDateStr] || [];

  console.log(props);
  return (
    <div className="calendar-container">
      <h2>Обрана дата: {selectedDate.toDateString()}</h2>
      <div class="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale="uk-UA"
          tileClassName={({ date }) => {
            const d = formatDate(date);
            return groupedEvents[d] ? "event-day" : null;
          }}
        />
        <div className="events-list">
          <h3>Події на {selectedDateStr}:</h3>
          {todayEvents.length > 0 ? (
            <ul>
              {todayEvents.map((event) => (
                <li key={event.id}>
                  <strong>{event.name}</strong> — {event.importance}
                  <br />
                  <small>
                    Створено:{" "}
                    {new Date(event.createdAt.seconds * 1000).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p>Подій немає</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
