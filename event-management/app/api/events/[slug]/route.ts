import { NextResponse, NextRequest} from "next/server";
import connectDB from "../../../../lib/mongo";
import Event from '../../../../database/event.model';

interface RouteProps {
    params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: RouteProps) {
    try {
        await connectDB();
        const resolvedParams = await params; // Await the resolution of the params promise to extract the slug value
        const { slug } = resolvedParams; // Destructure the slug from the resolved params
        

        // Method 1: Using find and getting the first index

        // const eventArray = await Event.find({ slug });
        // const event = eventArray.length > 0 ? eventArray[0] : null; // Get the first event if it exists, otherwise set to null

        // Method 2: Using findOne to directly get the event
        const event = await Event.findOne({ slug });


        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Event fetched successfully', event }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
    }
}