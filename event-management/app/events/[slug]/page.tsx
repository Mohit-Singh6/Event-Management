import EventsCard from "@/components/eventCard";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage ({ params }: PageProps) {

    const { slug } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`, {
        cache: 'no-store',
    });
    const data = await res.json();

    if (!res.ok || !data.event) {
        notFound();
    }

    return (
        <div>
        <h1 className="text-center text-white">Dev Event</h1>
            <EventsCard Event={data.event} />
        </div>
    )
}