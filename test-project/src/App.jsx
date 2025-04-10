import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";
import MyCalendar from "./components/MyCalendar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">Планування подій</h1>
          <div>
            {/* <Register /> */}
            {/* <Login /> */}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AddEvent />
          <EventList />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2025 Планування подій</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
