'use client';
import Image from "next/image";
import EventCard from "./eventCard";
import { IEvent } from "@/database/event.model";

export default function EventsDisplay ({events}: {events: IEvent[]}) {
    return (
        <div id="events">
            <ul className="mt-10 flex flex-row flex-wrap gap-5">
            {events && events.length > 0 && events.map((eve) => {
                console.log('Rendering event:', eve.slug);
                return (
                    <li key={eve.slug} className="list-none">
                        <EventCard Event={eve} key={eve.slug}/>
                    </li>
                );
            })}
            </ul>
        </div>
    )
}