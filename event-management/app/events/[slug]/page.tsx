// import EventsCard from "@/components/eventCard";
// 'use client';
import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from '@/components/bookEvent';

export const dynamic = 'force-dynamic';


interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage ({ params }: PageProps) {

    const { slug } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`, {
        cache: 'no-store',
    });
    const { event } = await res.json();

    if (!res.ok || !event) {
        notFound();
    }

    console.log('Fetched event:', event);

    return (
        <div>
            <h1 className="text-2xl font-bold text-white">{event.title}</h1>
            <div className="flex justify-between mt-5">
                <Image className="my-5" src={event.image} alt={event.title} width={600} height={400} />
                <BookEvent event={event} />
            </div>
            <h2 className="text-xl font-semibold text-white">Description:</h2>
            <p className="text-gray-300">{event.description}</p>
            <h2 className="text-xl font-semibold text-white mt-5">Overview:</h2>
            <p className="text-gray-300">{event.overview}</p>
            <div>
                <h3 className="text-lg font-medium text-white mt-6">More Details:</h3>
                <p className="text-gray-300">At {event.time} on {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-300">Location: {event.venue}</p>
                <p className="text-gray-300">Organizer: {event.mode}</p>
                <p className="text-gray-300">Audience: {event.audience}</p>
                <h3 className="text-lg font-medium text-white mt-4">Agenda:</h3>
                <div>
                    <ul className="text-gray-300">
                        {event.agenda.map((ag: string) => (
                            <li key={ag}>{ag}</li>
                        ))}
                    </ul>
                </div>
                <h3 className="text-lg font-medium text-yellow mt-4">By {event.organizer}</h3>
                <div className="mt-4">
                    <span>
                        {event.tags.map((tag: string) => {
                            return <span className="text-sm text-gray-300 mr-2 bg-gray-600 px-2 py-1 rounded">{tag}</span>;
                        })}
                    </span>
                </div>
            </div>

        </div>
    )
}