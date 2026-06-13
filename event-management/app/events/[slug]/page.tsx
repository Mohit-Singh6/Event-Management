// import EventsCard from "@/components/eventCard";
// 'use client';
import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from '@/components/bookEvent';


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
                            <li>{ag}</li>
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

// {
//   _id: '6a2cc4161bc227a657f720cb',
//   title: 'AI Innovation Conference 2026',
//   description: 'A conference dedicated to the latest breakthroughs in artificial intelligence, machine learning, and generative AI.',
//   overview: 'Industry experts, researchers, and developers gather to discuss cutting-edge AI technologies, real-world applications, ethical considerations,and the future of intelligent systems.',
//   image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2340&q=80',
//   venue: 'Bengaluru International Exhibition Centre',
//   location: 'Bengaluru, India',
//   date: '2026-07-15',
//   time: '09:30',
//   mode: 'hybrid',
//   audience: 'AI engineers, data scientists, researchers, students',
//   agenda: [
//     '09:30 AM - 10:30 AM | Opening Keynote: State of AI',
//     '10:45 AM - 12:00 PM | Generative AI in Production',
//     '12:00 PM - 01:00 PM | Lunch Break',
//     '01:00 PM - 02:30 PM | AI Ethics and Regulation',
//     '02:45 PM - 04:00 PM | Building AI-Powered Applications',
//     '04:15 PM - 05:00 PM | Networking Session'
//   ],
//   organizer: 'AI Nexus hosts conferences that bring together innovators and practitioners from across the AI ecosystem.',
//   tags: [ 'AI', 'Machine Learning', 'Data Science','Generative AI' ],
//   createdAt: '2026-06-13T02:44:38.385Z',
//   updatedAt: '2026-06-13T02:44:38.385Z',
//   slug: 'ai-innovation-conference-2026',
//   __v: 0
// }