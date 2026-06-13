'use server';
import connectdb from "../mongo";
import Booking from "@/database/booking.model";

export async function createBooking(email: string, eventId: string) {
    try {
        await connectdb();
        const existingBooking = await Booking.findOne({ email, eventId });
        if (existingBooking) {
            throw new Error('You have already registered for this event with this email.');
        }

        await Booking.create({ email, eventId });
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to create booking');
    }
}
