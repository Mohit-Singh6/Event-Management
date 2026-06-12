import Explore from '../components/exploreNow';
import EventsDisplay from '../components/eventsDisplay';
import events from '../data/events';

export default function Home () {
  return ( 
    <div>
      <h1 className="text-center text-white">Dev Event</h1>
      <p className="text-center text-red mt-5">All the events are available here for registration.</p>
      <Explore/>
      <EventsDisplay events={events} />
    </div>
  )
}