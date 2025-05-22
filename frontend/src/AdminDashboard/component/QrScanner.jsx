import { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

const QRScanner = () => {
    const [result, setResult] = useState(null);
    const [feedback, setFeedback] = useState("");

    const handleScan = async (data) => {
        if (data && data !== result) {
            setResult(data);
            try {
                await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/attendance/qr-checkin`, { scanId: data });
                setFeedback("Check-in successful!");
            } catch (err) {
                setFeedback("Check-in failed or already marked");
            }
        }
    };

    return (
        <div>
            <QrReader
                delay={300}
                onError={(err) => console.error(err)}
                onScan={handleScan}
                style={{ width: "100%" }}
            />
            <p className="mt-2 text-center text-lg">{feedback}</p>
        </div>
    );
};

export default QRScanner;
