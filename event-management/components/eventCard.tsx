'use client';
import Link from "next/link";

interface EventProps {
    id: number,
    name: string,
    description: string,
    date: string,
    location: string,
}

export default function EventCard ({ Event }: { Event: EventProps }) {
    return (
        <div className="mt-5 p-5 border rounded-lg shadow-md">
        <Link href={`/events/${Event.id}`}>
                <h2 className="text-xl font-bold">{Event.name}</h2>
                <p className="text-gray-600">{Event.description}</p>
        </Link>
                <p>{Event.date}, {Event.location}</p>
            </div>
    )
}