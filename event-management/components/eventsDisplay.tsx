'use client';
import Image from "next/image";
import EventCard from "./eventCard";

interface EventProps {
    id: number,
    name: string,
    description: string,
    date: string,
    location: string,
}

export default function EventsDisplay ({events}: {events: EventProps[]}) {
    return (
        <div>
            {events.map((eve) => (
                <EventCard Event={eve} key={eve.id}/>
            ))}
        </div>
    )
}