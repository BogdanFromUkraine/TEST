import { useEffect, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/config.js";
import MyCalendar from "./MyCalendar.jsx";
import {
  getUserEvents,
  deleteEvent,
  updateEvent,
} from "../firebase/firebaseService.js";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null); // подія для редагування
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    importance: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);

      if (user) {
        const fetchData = async () => {
          const userEvents = await getUserEvents(user.uid);
          const list = userEvents.map((u) => ({
            id: u.id,
            ...u,
          }));
          setEvents(list);
        };
        fetchData();
        console.log(events);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      alert("Подію видалено!");
    } catch (err) {
      console.error("Помилка при видаленні:", err);
    }
  };

  const handleEditClick = (e) => {
    setEditEvent(e);
    setFormData({
      name: e.name,
      date: e.date,
      importance: e.importance,
    });
    setIsModalOpen(true); // відкриваємо модалку
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editEvent) return;

    try {
      await updateEvent(editEvent.id, {
        name: formData.name,
        date: formData.date,
        importance: formData.importance,
      });
      alert("Подію оновлено!");
      setIsModalOpen(false); // закриваємо модалку після оновлення
    } catch (err) {
      console.error("Помилка при оновленні:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul>
        {console.log(events)}
        {events.map((e) => (
          <li key={e.id}>
            {e.name} – {e.date} – {e.importance}
            <button onClick={() => handleDelete(e.id)}>Видалити</button>
            <button onClick={() => handleEditClick(e)}>Редагувати</button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Редагувати подію</h3>
            <form onSubmit={handleUpdate}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Назва"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <select
                name="importance"
                value={formData.importance}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                <option value="звичайна">звичайна</option>
                <option value="важлива">важлива</option>
                <option value="критична">критична</option>
              </select>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="submit">Оновити</button>
                <button type="button" onClick={closeModal}>
                  Закрити
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <MyCalendar events={events} />
    </div>
  );
};

export default EventList;
