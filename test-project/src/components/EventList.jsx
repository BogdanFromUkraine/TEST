import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { auth, db } from "../firebase/config.js";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);

      if (user) {
        const fetchData = async () => {
          const q = query(
            collection(db, "events"),
            where("userId", "==", user.uid)
          );

          const snapshot = await getDocs(q);
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEvents(list);
        };
        fetchData();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
      alert("Подію видалено!");
    } catch (err) {
      console.error("Помилка при видаленні:", err);
    }
  };

  return (
    <ul>
      {events.map((e) => (
        <li key={e.id}>
          {e.name} – {e.date} – {e.importance}
          <button onClick={() => handleDelete(e.id)}>Видалити</button>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
