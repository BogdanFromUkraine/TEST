import { useState } from "react";
import { auth } from "../firebase/config.js";
import { createEvent } from "../firebase/firebaseService.js";

const AddEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    importance: "звичайна",
  });

  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event.name || !event.date) {
      alert("Будь ласка, заповніть всі поля!");
      return;
    }

    try {
      setLoading(true);
      await createEvent({
        ...event,
        createdAt: new Date(),
        userId: user.uid,
      });
      setEvent({ name: "", date: "", importance: "звичайна" }); // Clear the form after successful submission
      alert("Подію додано!");
    } catch (err) {
      console.error("Помилка додавання:", err);
      alert("Помилка додавання події!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Додати подію
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-medium">
            Назва події
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={event.name}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введіть назву події"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-gray-700 font-medium">
            Дата та час
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="importance" className="text-gray-700 font-medium">
            Важливість
          </label>
          <select
            id="importance"
            name="importance"
            value={event.importance}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="звичайна">Звичайна</option>
            <option value="важлива">Важлива</option>
            <option value="критична">Критична</option>
          </select>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded-md focus:outline-none ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Завантаження..." : "Додати подію"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
