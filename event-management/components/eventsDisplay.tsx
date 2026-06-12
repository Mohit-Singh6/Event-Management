'use client';
import Image from "next/image";
import EventCard from "./eventCard";

interface EventProps {
    id: number,
    name: string,
    description: string,
    date: string,
    location: string,
    image: string,
}

export default function EventsDisplay ({events}: {events: EventProps[]}) {
    return (
        <div id="events">
            <ul className="mt-10 flex flex-row flex-wrap gap-5">
            {events.map((eve) => (
                <li key={eve.id} className="list-none">
                    <EventCard Event={eve} key={eve.id}/>
                </li>
            ))}
            </ul>
        </div>
    )
}