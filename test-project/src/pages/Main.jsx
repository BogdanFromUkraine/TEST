import AddEvent from "../components/AddEvent";
import EventList from "../components/EventList";

export default function Main() {
  return (
    <main className="flex-1 px-6 mt-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-6 justify-start">
        <div className="flex-[1_1_300px]">
          <AddEvent />
        </div>
        <div className="flex-[1_1_300px]">
          <EventList />
        </div>
      </div>
    </main>
  );
}
