// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Calendar from 'react-calendar';
// import { toast } from 'react-toastify';
// import AddPlanModal from './AddPlanModal';
// import 'react-calendar/dist/Calendar.css';

// const MemberProfile = ({ member, onClose }) => {
//     const [formData, setFormData] = useState(member);
//     const [editMode, setEditMode] = useState(false);
//     const [attendanceDates, setAttendanceDates] = useState([]);
//     const [showAddPlanModal, setShowAddPlanModal] = useState(false);

//     useEffect(() => {
//         setFormData(member);
//         fetchAttendance();
//     }, [member]);

//     const fetchAttendance = async () => {
//         try {
//             const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/attendance/${member._id}`);
//             const attendanceDates = res.data.attendance.map(entry => {
//                 const date = new Date(entry.date);
//                 return date.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
//             });
//             setAttendanceDates(attendanceDates);
//         } catch (err) {
//             console.error("Attendance fetch failed", err);
//         }
//     };
    

//     const fetchMemberAgain = async () => {
//         try {
//             const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${member._id}`);
//             setFormData(res.data);
//             toast.success("Membership plan updated!");
//         } catch (err) {
//             toast.error("Failed to refresh member data.");
//         }
//     };

//     const handleUpdate = async () => {
//         try {
//             await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${member._id}`, formData);
//             toast.success("Profile updated!");
//             setEditMode(false);
//         } catch (err) {
//             toast.error("Update failed");
//         }
//     };

//     const isPlanExpired = () => {
//         const latestPlan = formData.membershipPlans[0];
//         if (!latestPlan || !latestPlan.endDate) return true;
//         return new Date(latestPlan.endDate) < new Date();
//     };

//     return (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
//             <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] max-h-[90vh] overflow-auto shadow-2xl border border-gray-700">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold">Member Profile</h2>
//                     <button onClick={onClose} className="text-red-400 hover:text-red-600">❌</button>
//                 </div>

//                 {editMode ? (
//                     <div className="grid grid-cols-2 gap-4">
//                         <input
//                             className="bg-gray-800 text-white border border-gray-600 p-2 rounded"
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={e => setFormData({ ...formData, fullName: e.target.value })}
//                         />
//                         <input
//                             className="bg-gray-800 text-white border border-gray-600 p-2 rounded"
//                             name="email"
//                             value={formData.email}
//                             onChange={e => setFormData({ ...formData, email: e.target.value })}
//                         />
//                         <input
//                             className="bg-gray-800 text-white border border-gray-600 p-2 rounded"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={e => setFormData({ ...formData, phone: e.target.value })}
//                         />
//                         <button
//                             onClick={handleUpdate}
//                             className="col-span-2 bg-green-600 hover:bg-green-700 text-white p-2 mt-2 rounded"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="space-y-1">
//                         <p><b>Name:</b> {formData.fullName}</p>
//                         <p><b>Email:</b> {formData.email}</p>
//                         <p><b>Phone:</b> {formData.phone}</p>
//                         <p><b>Gender:</b> {formData.gender}</p>
//                         <p><b>Join Date:</b> {new Date(formData.joinDate).toLocaleDateString()}</p>
//                         <p><b>Emergency Contact:</b> {formData.emergencyContact?.name} ({formData.emergencyContact?.phone})</p>
//                         <button
//                             onClick={() => setEditMode(true)}
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 mt-2 rounded"
//                         >
//                             Edit Profile
//                         </button>
//                     </div>
//                 )}

//                 <div className="mt-6">
//                     <h3 className="text-lg font-semibold mb-2">Attendance</h3>
//                     <div className="bg-gray-800 p-3 rounded border border-gray-700">
//                         <Calendar
//                             className="REACT-CALENDAR p-2 bg-gray-800 text-white rounded"
//                             tileClassName={({ date }) =>
//                                 attendanceDates.includes(date.toISOString().split('T')[0]) ? 'bg-green-500 text-white rounded-full' : ''
//                             }
//                         />
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <h3 className="text-lg font-semibold mb-2">Membership Plan</h3>
//                     {formData.membershipPlans.length > 0 ? (
//                         <div className="border border-gray-600 bg-gray-800 p-4 rounded space-y-1">
//                             <p><b>Type:</b> {formData.membershipPlans[0].option}</p>
//                             <p><b>Start:</b> {new Date(formData.membershipPlans[0].startDate).toLocaleDateString()}</p>
//                             <p><b>End:</b> {new Date(formData.membershipPlans[0].endDate).toLocaleDateString()}</p>
//                             <p><b>Status:</b> {formData.membershipPlans[0].isActive ? 'Active' : 'Inactive'}</p>
//                         </div>
//                     ) : (
//                         <p className="text-red-400">No plan assigned.</p>
//                     )}

//                     {isPlanExpired() && (
//                         <button
//                             onClick={() => setShowAddPlanModal(true)}
//                             className="bg-yellow-500 hover:bg-yellow-600 text-black mt-2 p-2 rounded"
//                         >
//                             Add New Plan
//                         </button>
//                     )}

//                     {showAddPlanModal && (
//                         <AddPlanModal
//                             memberId={member._id}
//                             onClose={() => setShowAddPlanModal(false)}
//                             onPlanAdded={fetchMemberAgain}
//                         />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MemberProfile;




import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { toast } from 'react-toastify';
import AddPlanModal from './AddPlanModal';

const MemberProfile = ({ member, onClose }) => {
    const [formData, setFormData] = useState(member);
    const [editMode, setEditMode] = useState(false);
    const [attendanceDates, setAttendanceDates] = useState([]);
    const [showAddPlanModal, setShowAddPlanModal] = useState(false);

    useEffect(() => {
        setFormData(member);
        fetchAttendance();
    }, [member]);

    const fetchAttendance = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/attendance/${member._id}`);
            const attendanceDates = res.data.attendance.map(entry => {
                const date = new Date(entry.date);
                return date.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
            });
            setAttendanceDates(attendanceDates);
        } catch (err) {
            console.error("Attendance fetch failed", err);
        }
    };


    const fetchMemberAgain = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${member._id}`);
            setFormData(res.data);
            toast.success("Membership plan updated!");
        } catch (err) {
            toast.error("Failed to refresh member data.");
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${member._id}`, formData);
            toast.success("Profile updated!");
            setEditMode(false);
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const isPlanExpired = () => {
        const latestPlan = formData.membershipPlans?.[0];
        if (!latestPlan || !latestPlan.endDate) return true;
        return new Date(latestPlan.endDate) < new Date();
    };

    const shouldShowAddPlanButton = () => {
        // Show button if no plans exist OR if the latest plan is expired OR inactive
        const latestPlan = formData.membershipPlans?.[0];
        if (!latestPlan) return true;
        if (!latestPlan.isActive) return true;
        if (isPlanExpired()) return true;
        return false;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-black border border-gray-700 rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {formData.fullName?.charAt(0) || 'M'}
                        </div>
                        <h2 className="text-xl font-bold text-white">Member Profile</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
                    <div className="p-6 space-y-8">
                        {/* Profile Section */}
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                Personal Information
                            </h3>

                            {editMode ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                            <input
                                                name="fullName"
                                                value={formData.fullName || ''}
                                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email || ''}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter email address"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                            <input
                                                name="phone"
                                                value={formData.phone || ''}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                        <button
                                            onClick={handleUpdate}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setEditMode(false)}
                                            className="flex-1 sm:flex-none bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-gray-400 text-sm">Name</span>
                                                <p className="text-white font-medium text-lg">{formData.fullName || 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 text-sm">Email</span>
                                                <p className="text-white font-medium">{formData.email || 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 text-sm">Phone</span>
                                                <p className="text-white font-medium">{formData.phone || 'Not provided'}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-gray-400 text-sm">Gender</span>
                                                <p className="text-white font-medium">{formData.gender || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 text-sm">Join Date</span>
                                                <p className="text-white font-medium">
                                                    {formData.joinDate ? new Date(formData.joinDate).toLocaleDateString() : 'Not available'}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 text-sm">Emergency Contact</span>
                                                <p className="text-white font-medium">
                                                    {formData.emergencyContact?.name && formData.emergencyContact?.phone
                                                        ? `${formData.emergencyContact.name} (${formData.emergencyContact.phone})`
                                                        : 'Not provided'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Edit Profile
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Attendance Section */}
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                Attendance Calendar
                            </h3>
                            <div className="bg-gray-800 rounded-lg p-4 [&_.react-calendar]:bg-gray-800 [&_.react-calendar]:border-none [&_.react-calendar]:text-white [&_.react-calendar__navigation]:text-white [&_.react-calendar__navigation__label]:text-white [&_.react-calendar__navigation__arrow]:text-white [&_.react-calendar__month-view__weekdays]:text-gray-400 [&_.react-calendar__tile]:text-white [&_.react-calendar__tile]:bg-gray-700 [&_.react-calendar__tile]:border-gray-600 [&_.react-calendar__tile--active]:bg-blue-600 [&_.react-calendar__tile--now]:bg-gray-600">
                                <Calendar
                                    tileClassName={({ date }) =>
                                        attendanceDates.includes(date.toISOString().split('T')[0])
                                            ? 'bg-green-600 text-white'
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        {/* Membership Plan Section */}
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                                    </svg>
                                    Membership Plan
                                </h3>

                                {/* Always show Add Plan button */}
                                <button
                                    onClick={() => setShowAddPlanModal(true)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center text-sm"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add Plan
                                </button>
                            </div>

                            {formData.membershipPlans?.length > 0 ? (
                                <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <span className="text-gray-400 text-sm">Plan Type</span>
                                            <p className="text-white font-semibold text-lg">{formData.membershipPlans[0].option}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm">Start Date</span>
                                            <p className="text-white font-medium">
                                                {new Date(formData.membershipPlans[0].startDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm">End Date</span>
                                            <p className="text-white font-medium">
                                                {new Date(formData.membershipPlans[0].endDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm">Status</span>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${formData.membershipPlans[0].isActive && !isPlanExpired()
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                <span className={`w-2 h-2 rounded-full mr-2 ${formData.membershipPlans[0].isActive && !isPlanExpired() ? 'bg-green-400' : 'bg-red-400'
                                                    }`}></span>
                                                {formData.membershipPlans[0].isActive && !isPlanExpired() ? 'Active' : 'Expired/Inactive'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Show expiration warning if plan is expired */}
                                    {isPlanExpired() && (
                                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            <p className="text-red-400 text-sm font-medium">
                                                ⚠️ This membership plan has expired. Please add a new plan.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 text-center">
                                    <div className="text-gray-400 mb-2">
                                        <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-white font-medium">No membership plan assigned</p>
                                    <p className="text-gray-400 text-sm mt-1">Add a plan to get started</p>
                                </div>
                            )}

                            {showAddPlanModal && (
                                <AddPlanModal
                                    memberId={member._id}
                                    onClose={() => setShowAddPlanModal(false)}
                                    onPlanAdded={fetchMemberAgain}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfile;