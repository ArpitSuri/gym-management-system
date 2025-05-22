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
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Today's Attendance</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <AttendanceTable data={attendanceData} onRefresh={fetchAttendance} />
            )}
        </div>
    );
};

export default Attendance;
