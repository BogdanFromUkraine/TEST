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
    <div className="p-6 flex justify-around items-center p-4 space-x-10">
      <ul className="space-y-4">
        {events.map((e) => (
          <li
            key={e.id}
            className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{e.name}</p>
              <p className="text-sm text-gray-600">{e.date}</p>
              <p className="text-sm text-gray-500 italic">{e.importance}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(e.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Видалити
              </button>
              <button
                onClick={() => handleEditClick(e)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Редагувати
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Редагувати подію</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Назва"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              <select
                name="importance"
                value={formData.importance}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="звичайна">звичайна</option>
                <option value="важлива">важлива</option>
                <option value="критична">критична</option>
              </select>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Оновити
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Закрити
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6">
        <MyCalendar events={events} />
      </div>
    </div>
  );
};

export default EventList;
