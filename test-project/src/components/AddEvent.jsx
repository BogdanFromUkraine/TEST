import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config.js";

const AddEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    importance: "звичайна",
  });

  const user = auth.currentUser; // отримую поточного користувача

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), {
        ...event,
        createdAt: new Date(),
        userId: user.uid,
      });
      alert("Подію додано!");
    } catch (err) {
      console.error("Помилка додавання:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Назва події" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <select name="importance" onChange={handleChange}>
        <option>звичайна</option>
        <option>важлива</option>
        <option>критична</option>
      </select>
      <button type="submit">Додати</button>
    </form>
  );
};

export default AddEvent;
