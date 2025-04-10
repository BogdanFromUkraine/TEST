import { useState } from "react";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config.js";

const RemoveEvent = () => {
  const [eventId, setEventId] = useState("");

  const handleChange = (e) => {
    setEventId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Будь ласка, увійдіть у систему.");
      return;
    }

    try {
      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef);
      alert("Подію видалено!");
      setEventId("");
    } catch (err) {
      console.error("Помилка видалення:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID події для видалення"
        value={eventId}
        onChange={handleChange}
      />
      <button type="submit">Видалити</button>
    </form>
  );
};

export default RemoveEvent;
