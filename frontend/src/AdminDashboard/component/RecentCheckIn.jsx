// components/RecentCheckins.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentCheckins = () => {
    const [checkins, setCheckins] = useState([]);

    useEffect(() => {
        axios.get('/api/attendance/recent')
            .then(res => setCheckins(res.data))
            .catch(() => setCheckins([]));
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recent Check-ins</h3>
            <ul className="divide-y divide-gray-200">
                {checkins.map((item, i) => (
                    <li key={i} className="py-2">
                        {item.memberName} – {new Date(item.time).toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentCheckins;
