import { Suspense } from "react";
import Explore from "../components/exploreNow";
import EventsDisplay from "../components/eventsDisplay";

async function EventsList() {
  const events = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`).then(
    (res) => res.json()
  );

  return <EventsDisplay events={events.events} />;
}

function EventsLoading() {
  return <p className="text-center text-white mt-10">Loading events...</p>;
}

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-white">Dev Event</h1>
      <p className="text-center text-red mt-5">
        All the events are available here for registration.
      </p>
      <Explore />
      <Suspense fallback={<EventsLoading />}>
        <EventsList />
      </Suspense>
    </div>
  );
}
