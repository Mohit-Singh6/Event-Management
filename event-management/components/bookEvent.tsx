
'use client';
import { useState } from "react";
// import connectdb from "../lib/mongo";
// import Booking from "@/database/booking.model";

export default function BookEvent({ event }: { event: any }) {

    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        // if (!email) return;
        // connectdb();

        // const existingBooking = await Booking.findOne({email: email, eventId: event._id});
        // if (existingBooking) {
            // throw new Error('You have already registered for this event with this email.');
            // return;
        // }
        
        // const booking = await Booking.create({email: email, eventId: event._id}); // Create a new booking document in the database using the provided email and event ID

        setTimeout(() => {
            setRegistered(true);
        }, 1000);
    }

    
    return (
        <div className="ml-5 mr-10 flex flex-col justify-center bg-gray-800 p-5 rounded-lg h-30 mt-25">
            {registered ? (
                <h2 className="text-lg font-semibold text-white w-100">You are registered for the event!</h2>) : (
                <div>
                    <h2 className="text-lg font-semibold text-white mb-3">Register for event:</h2>
                    <div>
                        <input type="text" placeholder="Enter your email" className="p-2 rounded-l bg-gray-700 text-white focus:outline-none w-90 h-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className="p-2 bg-blue-600 text-white rounded-r hover:bg-blue-700" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            )}
        </div>
    )
}