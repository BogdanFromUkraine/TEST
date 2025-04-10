import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
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

  return (
    <ul>
      {events.map((e) => (
        <li key={e.id}>
          {e.name} – {e.date} – {e.importance}
        </li>
      ))}
    </ul>
  );
};

export default EventList;
