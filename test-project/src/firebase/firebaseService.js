import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { app } from "./config.js";

const db = getFirestore(app); // Ініціалізую Firestore

// Створення події
export async function createEvent(event) {
  try {
    const docRef = await addDoc(collection(db, "events"), event);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Повертати помилку, щоб можна було обробити її в компонентах
  }
}

// Отримання подій, що належать користувачу
export async function getUserEvents(userId) {
  const querySnapshot = await getDocs(collection(db, "events"));
  const userEvents = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().userId === userId) {
      userEvents.push({ id: doc.id, ...doc.data() });
    }
  });
  return userEvents;
}

// Оновлення даних події
export async function updateEvent(eventId, updatedData) {
  const eventRef = doc(db, "events", eventId);
  await updateDoc(eventRef, updatedData);
  console.log("Event updated with ID: ", eventId);
}

// Видалення події
export async function deleteEvent(eventId) {
  const eventRef = doc(db, "events", eventId);
  await deleteDoc(eventRef);
  console.log("Event deleted with ID: ", eventId);
}
