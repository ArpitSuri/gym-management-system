// src/components/AttendanceForm.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AttendanceForm = () => {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/attendance/scan-qr-checkin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });

            const data = await res.json();
            setMessage(data.message);
            setStatus(res.ok ? toast.success(data.message) : toast.error(data.message));
            setPhone('');
        } catch (err) {
            setMessage('Server error. Try again later.');
            setStatus('error');
            toast.error("Error marking attendance. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h2 className="text-2xl font-bold mb-4">Gym Attendance</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
                <label htmlFor="phone" className="block mb-2 font-medium">
                    Enter Your Phone Number:
                </label>
                <input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-grey-100 cursor-pointer"
                >
                    Mark Attendance
                </button>

               
            </form>
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-600">
                Take me back to main website?{" "}
                <a href="/" className="font-medium tex hover:text-black">
                    Click here
                </a>
            </div>
            
            {/* {message && (
                <div className={`mt-4 text-center ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </div>
            )} */}
        </div>
    );
};

export default AttendanceForm;
