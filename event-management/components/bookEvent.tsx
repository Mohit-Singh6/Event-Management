
'use client';
import { useState } from "react";
import { createBooking } from "@/lib/actions/bookEvent.actions";

export default function BookEvent({ event }: { event: any }) {

    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');


    const handleRegister = async () => {
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }

        try {
            setError('');
            const result = await createBooking(email.trim(), event._id);
            if (result?.success) {
                setRegistered(true);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create booking');
        }
    }

    
    return (
        <div className="ml-5 mr-10 flex flex-col justify-center bg-gray-800 p-5 rounded-lg h-30 mt-25">
            {registered ? (
                <h2 className="text-lg font-semibold text-white w-100">You are registered for the event!</h2>) : (
                <div>
                    <h2 className="text-lg font-semibold text-white mb-3">Register for event:</h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <div>
                        <input type="text" placeholder="Enter your email" className="p-2 rounded-l bg-gray-700 text-white focus:outline-none w-90 h-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className="p-2 bg-blue-600 text-white rounded-r hover:bg-blue-700" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            )}
        </div>
    )
}