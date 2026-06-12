'use client';
import Link from "next/link";
import Image from "next/image";

interface EventProps {
    id: number,
    image: string,
    name: string,
    description: string,
    date: string,
    location: string,
}

export default function EventCard ({ Event }: { Event: EventProps }) {
    return (
        <div className="mt-5 p-5 border rounded-lg shadow-md" style={{ width: '500px' }}>
        <Link href={`/events/${Event.id}`}>
                <Image src={Event.image} alt={Event.name} width={450} height={250} className="rounded-lg mb-4"/>
                <h2 className="text-xl font-bold">{Event.name}</h2>
                <p className="text-gray-600">{Event.description}</p>
        </Link>
                <p>{Event.date}, {Event.location}</p>
            </div>
    )
}