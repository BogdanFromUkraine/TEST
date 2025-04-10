import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";
import RemoveEvent from "./components/RemoveEvent";

function App() {
  return (
    <>
      <AddEvent />
      <Register />
      <Login />
      <EventList />
      <RemoveEvent />
    </>
  );
}

export default App;
