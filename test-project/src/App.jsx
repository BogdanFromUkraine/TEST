import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";
import MyCalendar from "./components/MyCalendar";

function App() {
  return (
    <>
      <AddEvent />
      <Register />
      <Login />
      <EventList />
    </>
  );
}

export default App;
