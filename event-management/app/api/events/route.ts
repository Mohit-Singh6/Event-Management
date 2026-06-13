import { NextResponse, NextRequest} from "next/server";
import connectDB from "../../../lib/mongo";
import Event from '../../../database/event.model';

export async function POST(req: NextRequest) {

        // Using form data

    // try {
    //     await connectDB();

        // LEARN MORE ABOUT THIS IN THE FORMDATA.md README FILE!
    //     const formData = await req.formData();
    //    // const email = formData.get('email') as string;
    //    // const eventId = formData.get('eventId') as string;
        
    //     let event;
    //     try {
    //         event = Object.fromEntries(formData.entries()); // Convert FormData to a plain object
    //     } catch (error) {
    //         return NextResponse.json({ error: 'Invalid form data format' }, { status: 400 });
    //     }

    //     const createdEvent = await Event.create(event); // mongoose method to create a new document in the database using the parsed data

    //     return NextResponse.json({ message: 'Booking created successfully', booking: createdEvent }, { status: 201 });
    // }
    // catch (error) {
    //     return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    // }

        // Using json data

    try {
        await connectDB();
        const data = await req.json(); // Parse the incoming JSON data from the request body
        // const email = data['email'] as string;
        // const eventId = data['eventId'] as string;

        // let event;

        const createdEvent = await Event.create(data); // Create a new event document in the database using the parsed data, mongoose method to create a new document in the database using the parsed data

        return NextResponse.json({ message: 'Booking created successfully', booking: createdEvent }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectDB();
        
        const data = await Event.find().sort({ createdAt: -1 }); // Fetch all events from the database and sort them by creation date in descending order (newest first)

        // -1 = Descending Order: Newest items first, oldest items last (Z to A, largest to smallest number).
        // 1 = Ascending Order: Oldest items first, newest items last (A to Z, smallest to largest number).

        console.log('DATA:', data);


        return NextResponse.json({ message: 'Events fetched successfully', events: data }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}