import Explore from '../components/exploreNow';
import EventsDisplay from '../components/eventsDisplay';
import { cacheLife } from 'next/cache';

export default async function Home () {
  
  const events = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`).then(res => res.json());
  console.log('Fetched events:', events.events);

  return ( 
    <div>
      <h1 className="text-center text-white">Dev Event</h1>
      <p className="text-center text-red mt-5">All the events are available here for registration.</p>
      <Explore/>
        <EventsDisplay events={events.events} />
    </div>
  )
}