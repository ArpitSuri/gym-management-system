import React, { useEffect, useState } from "react";
import axios from "axios";
import AttendanceTable from "./component/AttendanceTable";

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAttendance = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/attendance/today`);
            setAttendanceData(res.data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-8 w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Today's Attendance
            </h1>
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow">
                    <AttendanceTable data={attendanceData} onRefresh={fetchAttendance} />
                </div>
            )}
        </div>
    );
};

export default Attendance;
