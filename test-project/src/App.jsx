import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";
import MyCalendar from "./components/MyCalendar";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
