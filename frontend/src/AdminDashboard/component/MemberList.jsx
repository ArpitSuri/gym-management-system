// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const MembersList = () => {
//     const [members, setMembers] = useState([]);
//     const [selectedMember, setSelectedMember] = useState(null);
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({});

//     const fetchMembers = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members`);
//             setMembers(response.data.members);
//         } catch (error) {
//             console.error('Failed to fetch members:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMembers();
//     }, []);

//     const handleDelete = async (id) => {
//         if (!confirm("Are you sure you want to delete this member?")) return;
//         try {
//             await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${id}`);
//             alert("Member deleted successfully.");
//             fetchMembers();
//         } catch (error) {
//             console.error('Failed to delete member:', error);
//         }
//     };

//     const handleView = async (id) => {
//         try {
//             const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${id}`);
//             setSelectedMember(res.data.member);
//             setFormData(res.data.member);
//             setEditMode(false);
//         } catch (err) {
//             console.error("Failed to view member", err);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleUpdate = async () => {
//         try {
//             const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${selectedMember._id}`, formData);
//             alert("Profile updated.");
//             setSelectedMember(res.data.member);
//             setEditMode(false);
//             fetchMembers();
//         } catch (err) {
//             console.error("Failed to update", err);
//         }
//     };

//     const closeModal = () => {
//         setSelectedMember(null);
//         setEditMode(false);
//     };

//     return (
//         <div className="p-6 bg-white shadow rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">All Members</h1>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full text-sm text-left border border-gray-200">
//                     <thead className="bg-blue-700 text-white">
//                         <tr>
//                             <th className="p-3">Photo</th>
//                             <th className="p-3">Name</th>
//                             <th className="p-3">Email</th>
//                             <th className="p-3">Phone</th>
//                             <th className="p-3">Gender</th>
//                             <th className="p-3">Plan</th>
//                             <th className="p-3">Start Date</th>
//                             <th className="p-3">End Date</th>
//                             <th className="p-3">Active</th>
//                             <th className="p-3">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {members.map((member) => {
//                             const plan = member.membershipPlans[0];
//                             return (
//                                 <tr key={member._id} className="hover:bg-gray-50">
//                                     <td className="p-3">
//                                         {member.photoUrl ? (
//                                             <img src={member.photoUrl} className="h-10 w-10 rounded-full object-cover" />
//                                         ) : (
//                                             <span className="text-gray-400">No Photo</span>
//                                         )}
//                                     </td>
//                                     <td className="p-3">{member.fullName}</td>
//                                     <td className="p-3">{member.email}</td>
//                                     <td className="p-3">{member.phone}</td>
//                                     <td className="p-3">{member.gender}</td>
//                                     <td className="p-3">{plan?.planId?.name || 'N/A'} ({plan?.option})</td>
//                                     <td className="p-3">{plan?.startDate ? new Date(plan.startDate).toLocaleDateString() : 'N/A'}</td>
//                                     <td className="p-3">{plan?.endDate ? new Date(plan.endDate).toLocaleDateString() : 'N/A'}</td>
//                                     <td className="p-3">
//                                         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan?.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
//                                             {plan?.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                     </td>
//                                     <td className="p-3 space-x-2">
//                                         <button onClick={() => handleView(member._id)} className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
//                                         <button onClick={() => handleDelete(member._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             {/* View/Edit Modal */}
//             {selectedMember && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
//                         <h2 className="text-xl font-bold mb-4">Member Profile</h2>

//                         {editMode ? (
//                             <>
//                                 <input className="border p-2 w-full mb-2" name="fullName" value={formData.fullName || ''} onChange={handleChange} placeholder="Full Name" />
//                                 <input className="border p-2 w-full mb-2" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" />
//                                 <input className="border p-2 w-full mb-2" name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Phone" />
//                                 <input className="border p-2 w-full mb-2" name="gender" value={formData.gender || ''} onChange={handleChange} placeholder="Gender" />

//                                 <div className="flex justify-end space-x-2 mt-4">
//                                     <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//                                     <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//                                 </div>
//                             </>
//                         ) : (
//                             <>
//                                 <p><strong>Name:</strong> {selectedMember.fullName}</p>
//                                 <p><strong>Email:</strong> {selectedMember.email}</p>
//                                 <p><strong>Phone:</strong> {selectedMember.phone}</p>
//                                 <p><strong>Gender:</strong> {selectedMember.gender}</p>
//                                 <p><strong>Join Date:</strong> {new Date(selectedMember.joinDate).toLocaleDateString()}</p>

//                                 <div className="flex justify-end space-x-2 mt-4">
//                                     <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
//                                     <button onClick={closeModal} className="bg-gray-600 text-white px-4 py-2 rounded">Close</button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MembersList;


// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const MembersList = () => {
//     const [members, setMembers] = useState([]);
//     const [selectedMember, setSelectedMember] = useState(null);
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({});

//     const fetchMembers = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members`);
//             setMembers(response.data.members);
//         } catch (error) {
//             console.error('Failed to fetch members:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMembers();
//     }, []);

//     const handleDelete = async (id) => {
//         if (!confirm("Are you sure you want to delete this member?")) return;
//         try {
//             await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${id}`);
//             alert("Member deleted successfully.");
//             fetchMembers();
//         } catch (error) {
//             console.error('Failed to delete member:', error);
//         }
//     };

//     const handleView = async (id) => {
//         try {
//             const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${id}`);
//             setSelectedMember(res.data.member);
//             setFormData(res.data.member);
//             setEditMode(false);
//         } catch (err) {
//             console.error("Failed to view member", err);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleUpdate = async () => {
//         try {
//             const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${selectedMember._id}`, formData);
//             alert("Profile updated.");
//             setSelectedMember(res.data.member);
//             setEditMode(false);
//             fetchMembers();
//         } catch (err) {
//             console.error("Failed to update", err);
//         }
//     };

//     const closeModal = () => {
//         setSelectedMember(null);
//         setEditMode(false);
//     };

//     return (
//         <div className="p-6 bg-white shadow rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">All Members</h1>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full text-sm text-left border border-gray-200">
//                     <thead className="bg-blue-700 text-white">
//                         <tr>
//                             <th className="p-3">Photo</th>
//                             <th className="p-3">Name</th>
//                             <th className="p-3">Email</th>
//                             <th className="p-3">Phone</th>
//                             <th className="p-3">Gender</th>
//                             <th className="p-3">Plan</th>
//                             <th className="p-3">Start Date</th>
//                             <th className="p-3">End Date</th>
//                             <th className="p-3">Active</th>
//                             <th className="p-3">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {members.map((member) => {
//                             const plan = member.membershipPlans[0];
//                             return (
//                                 <tr key={member._id} className="hover:bg-gray-50">
//                                     <td className="p-3">
//                                         {member.photoUrl ? (
//                                             <img src={member.photoUrl} className="h-10 w-10 rounded-full object-cover" alt="Member" />
//                                         ) : (
//                                             <span className="text-gray-400">No Photo</span>
//                                         )}
//                                     </td>
//                                     <td className="p-3">{member.fullName}</td>
//                                     <td className="p-3">{member.email}</td>
//                                     <td className="p-3">{member.phone}</td>
//                                     <td className="p-3">{member.gender}</td>
//                                     <td className="p-3">{plan?.planId?.name || 'N/A'} ({plan?.option})</td>
//                                     <td className="p-3">{plan?.startDate ? new Date(plan.startDate).toLocaleDateString() : 'N/A'}</td>
//                                     <td className="p-3">{plan?.endDate ? new Date(plan.endDate).toLocaleDateString() : 'N/A'}</td>
//                                     <td className="p-3">
//                                         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan?.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
//                                             {plan?.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                     </td>
//                                     <td className="p-3 space-x-2">
//                                         <button onClick={() => handleView(member._id)} className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
//                                         <button onClick={() => handleDelete(member._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             {/* View/Edit Modal */}
//             {selectedMember && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-auto">
//                         <h2 className="text-xl font-bold mb-4">Member Profile</h2>

//                         {editMode ? (
//                             <>
//                                 <input
//                                     className="border p-2 w-full mb-2"
//                                     name="fullName"
//                                     value={formData.fullName || ''}
//                                     onChange={handleChange}
//                                     placeholder="Full Name"
//                                 />
//                                 <input
//                                     className="border p-2 w-full mb-2"
//                                     name="email"
//                                     value={formData.email || ''}
//                                     onChange={handleChange}
//                                     placeholder="Email"
//                                 />
//                                 <input
//                                     className="border p-2 w-full mb-2"
//                                     name="phone"
//                                     value={formData.phone || ''}
//                                     onChange={handleChange}
//                                     placeholder="Phone"
//                                 />
//                                 <input
//                                     className="border p-2 w-full mb-2"
//                                     name="gender"
//                                     value={formData.gender || ''}
//                                     onChange={handleChange}
//                                     placeholder="Gender"
//                                 />
//                                 {/* Active toggle */}
//                                 <label className="flex items-center space-x-2 mt-4 mb-2">
//                                     <input
//                                         type="checkbox"
//                                         checked={formData.membershipPlans[0].isActive || false}
//                                         onChange={(e) => {
//                                             const newMembershipPlans = [...formData.membershipPlans];
//                                             newMembershipPlans[0] = {
//                                                 ...newMembershipPlans[0],
//                                                 isActive: e.target.checked,
//                                             };
//                                             setFormData({ ...formData, membershipPlans: newMembershipPlans });
//                                         }}
//                                     />
//                                     <span>Membership Active</span>
//                                 </label>

//                                 {/* Date Pickers for Membership Plan */}
//                                 {formData.membershipPlans && formData.membershipPlans.length > 0 && (
//                                     <>
//                                         <label className="block font-semibold mt-4 mb-1">Start Date</label>
//                                         <input
//                                             type="date"
//                                             className="border p-2 w-full mb-2"
//                                             name="startDate"
//                                             value={formData.membershipPlans[0].startDate ? formData.membershipPlans[0].startDate.slice(0, 10) : ''}
//                                             onChange={(e) => {
//                                                 const newMembershipPlans = [...formData.membershipPlans];
//                                                 newMembershipPlans[0] = {
//                                                     ...newMembershipPlans[0],
//                                                     startDate: e.target.value,
//                                                 };
//                                                 setFormData({ ...formData, membershipPlans: newMembershipPlans });
//                                             }}
//                                         />

//                                         <label className="block font-semibold mb-1">End Date</label>
//                                         <input
//                                             type="date"
//                                             className="border p-2 w-full mb-2"
//                                             name="endDate"
//                                             value={formData.membershipPlans[0].endDate ? formData.membershipPlans[0].endDate.slice(0, 10) : ''}
//                                             onChange={(e) => {
//                                                 const newMembershipPlans = [...formData.membershipPlans];
//                                                 newMembershipPlans[0] = {
//                                                     ...newMembershipPlans[0],
//                                                     endDate: e.target.value,
//                                                 };
//                                                 setFormData({ ...formData, membershipPlans: newMembershipPlans });
//                                             }}
//                                         />
//                                     </>
//                                 )}

//                                 <div className="flex justify-end space-x-2 mt-4">
//                                     <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//                                     <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//                                 </div>
//                             </>
//                         ) : (
//                             <>
//                                 <p><strong>Name:</strong> {selectedMember.fullName}</p>
//                                 <p><strong>Email:</strong> {selectedMember.email}</p>
//                                 <p><strong>Phone:</strong> {selectedMember.phone}</p>
//                                 <p><strong>Gender:</strong> {selectedMember.gender}</p>
//                                 <p><strong>Join Date:</strong> {new Date(selectedMember.joinDate).toLocaleDateString()}</p>

//                                 {/* Display membership plan dates if available */}
//                                 {selectedMember.membershipPlans && selectedMember.membershipPlans.length > 0 && (
//                                     <>
//                                         <p><strong>Plan Start Date:</strong> {selectedMember.membershipPlans[0].startDate ? new Date(selectedMember.membershipPlans[0].startDate).toLocaleDateString() : 'N/A'}</p>
//                                         <p><strong>Plan End Date:</strong> {selectedMember.membershipPlans[0].endDate ? new Date(selectedMember.membershipPlans[0].endDate).toLocaleDateString() : 'N/A'}</p>
//                                     </>
//                                 )}

//                                 <div className="flex justify-end space-x-2 mt-4">
//                                     <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
//                                     <button onClick={closeModal} className="bg-gray-600 text-white px-4 py-2 rounded">Close</button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MembersList;



import { useEffect, useState } from 'react';
import { Search, User, Mail, Phone, Calendar, Edit3, Trash2, X, Check, MoreHorizontal, UserCheck, UserX, Filter } from 'lucide-react';
import axios from 'axios';
import {toast} from "react-toastify"

const MembersList = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members`);
            setMembers(response.data.members);
        } catch (error) {
            console.error('Failed to fetch members:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this member?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${id}`);
            toast.success("Member deleted successfully.");
            fetchMembers();
        } catch (error) {
            console.error('Failed to delete member:', error);
        }
    };

    const handleView = async (id) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${id}`);
            setSelectedMember(res.data.member);
            setFormData(res.data.member);
            setEditMode(false);
        } catch (err) {
            console.error("Failed to view member", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${selectedMember._id}`, formData);
            toast.success("Profile updated.");
            setSelectedMember(res.data.member);
            setEditMode(false);
            fetchMembers();
        } catch (err) {
            console.error("Failed to update", err);
        }
    };

    const closeModal = () => {
        setSelectedMember(null);
        setEditMode(false);
    };

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phone.includes(searchTerm);

        const matchesFilter = filterStatus === 'all' ||
            (filterStatus === 'active' && member.membershipPlans[0]?.isActive) ||
            (filterStatus === 'inactive' && !member.membershipPlans[0]?.isActive);

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-6xl mx-auto p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Gym Members</h1>
                        <p className="text-gray-400 text-sm mt-1">Manage your community</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm">{filteredMembers.length} members</span>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        >
                            <option value="all">All Members</option>
                            <option value="active">Active Only</option>
                            <option value="inactive">Inactive Only</option>
                        </select>
                    </div>
                </div>

                {/* Members Feed */}
                <div className="space-y-3">
                    {filteredMembers.map((member) => {
                        const plan = member.membershipPlans[0];
                        return (
                            <div key={member._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:bg-gray-800 transition-all duration-200">
                                <div className="flex items-start gap-4">
                                    {/* Profile Picture */}
                                    <div className="flex-shrink-0">
                                        {member.photoUrl ? (
                                            <img
                                                src={member.photoUrl}
                                                className="h-12 w-12 rounded-full object-cover border-2 border-gray-700"
                                                alt="Member"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                                                <User className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Member Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-white text-lg">{member.fullName}</h3>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${plan?.isActive
                                                    ? 'bg-green-900 text-green-300 border border-green-700'
                                                    : 'bg-red-900 text-red-300 border border-red-700'
                                                }`}>
                                                {plan?.isActive ? (
                                                    <>
                                                        <UserCheck className="w-3 h-3 mr-1" />
                                                        Active
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserX className="w-3 h-3 mr-1" />
                                                        Inactive
                                                    </>
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-gray-400 text-sm mb-2">
                                            <div className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                {member.email}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Phone className="w-4 h-4" />
                                                {member.phone}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                                            <span>{member.gender}</span>
                                            <span>•</span>
                                            <span>{plan?.planId?.name || 'N/A'} ({plan?.option})</span>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                Joined {new Date(member.joinDate).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {plan && (
                                            <div className="mt-2 text-xs text-gray-500">
                                                Plan: {plan.startDate ? new Date(plan.startDate).toLocaleDateString() : 'N/A'} - {plan.endDate ? new Date(plan.endDate).toLocaleDateString() : 'N/A'}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleView(member._id)}
                                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-all"
                                            title="View Profile"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member._id)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all"
                                            title="Delete Member"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-all">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredMembers.length === 0 && (
                    <div className="text-center py-12">
                        <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No members found</h3>
                        <p className="text-gray-500">
                            {searchTerm ? 'Try adjusting your search terms' : 'No members have been added yet'}
                        </p>
                    </div>
                )}

                {/* Modal */}
                {selectedMember && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
                        <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-800">
                                <div className="flex items-center gap-3">
                                    {selectedMember.photoUrl ? (
                                        <img
                                            src={selectedMember.photoUrl}
                                            className="h-10 w-10 rounded-full object-cover"
                                            alt="Member"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <User className="w-5 h-5 text-gray-400" />
                                        </div>
                                    )}
                                    <h2 className="text-xl font-bold text-white">
                                        {editMode ? 'Edit Profile' : selectedMember.fullName}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                {editMode ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                            <input
                                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                                name="fullName"
                                                value={formData.fullName || ''}
                                                onChange={handleChange}
                                                placeholder="Full Name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                            <input
                                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                                name="email"
                                                value={formData.email || ''}
                                                onChange={handleChange}
                                                placeholder="Email"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                            <input
                                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                                name="phone"
                                                value={formData.phone || ''}
                                                onChange={handleChange}
                                                placeholder="Phone"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                                            <select
                                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                                name="gender"
                                                value={formData.gender || ''}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        {formData.membershipPlans && formData.membershipPlans.length > 0 && (
                                            <>
                                                <div className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        id="membershipActive"
                                                        checked={formData.membershipPlans[0].isActive || false}
                                                        onChange={(e) => {
                                                            const newMembershipPlans = [...formData.membershipPlans];
                                                            newMembershipPlans[0] = {
                                                                ...newMembershipPlans[0],
                                                                isActive: e.target.checked,
                                                            };
                                                            setFormData({ ...formData, membershipPlans: newMembershipPlans });
                                                        }}
                                                        className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                                                    />
                                                    <label htmlFor="membershipActive" className="text-sm font-medium text-gray-300">
                                                        Membership Active
                                                    </label>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                                                        <input
                                                            type="date"
                                                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                                            value={formData.membershipPlans[0].startDate ? formData.membershipPlans[0].startDate.slice(0, 10) : ''}
                                                            onChange={(e) => {
                                                                const newMembershipPlans = [...formData.membershipPlans];
                                                                newMembershipPlans[0] = {
                                                                    ...newMembershipPlans[0],
                                                                    startDate: e.target.value,
                                                                };
                                                                setFormData({ ...formData, membershipPlans: newMembershipPlans });
                                                            }}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                                                        <input
                                                            type="date"
                                                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                                            value={formData.membershipPlans[0].endDate ? formData.membershipPlans[0].endDate.slice(0, 10) : ''}
                                                            onChange={(e) => {
                                                                const newMembershipPlans = [...formData.membershipPlans];
                                                                newMembershipPlans[0] = {
                                                                    ...newMembershipPlans[0],
                                                                    endDate: e.target.value,
                                                                };
                                                                setFormData({ ...formData, membershipPlans: newMembershipPlans });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="flex justify-end space-x-3 pt-4">
                                            <button
                                                onClick={() => setEditMode(false)}
                                                className="px-6 py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleUpdate}
                                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2"
                                            >
                                                <Check className="w-4 h-4" />
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-400 mb-2">Personal Information</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <User className="w-4 h-4 text-gray-500" />
                                                        <span className="text-white">{selectedMember.fullName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Mail className="w-4 h-4 text-gray-500" />
                                                        <span className="text-gray-300">{selectedMember.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Phone className="w-4 h-4 text-gray-500" />
                                                        <span className="text-gray-300">{selectedMember.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-gray-500">Gender:</span>
                                                        <span className="text-gray-300">{selectedMember.gender}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Calendar className="w-4 h-4 text-gray-500" />
                                                        <span className="text-gray-300">Joined {new Date(selectedMember.joinDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {selectedMember.membershipPlans && selectedMember.membershipPlans.length > 0 && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-400 mb-2">Membership Details</h3>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-gray-500">Plan:</span>
                                                            <span className="text-gray-300">{selectedMember.membershipPlans[0].planId?.name} ({selectedMember.membershipPlans[0].option})</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-gray-500">Start:</span>
                                                            <span className="text-gray-300">
                                                                {selectedMember.membershipPlans[0].startDate ? new Date(selectedMember.membershipPlans[0].startDate).toLocaleDateString() : 'N/A'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-gray-500">End:</span>
                                                            <span className="text-gray-300">
                                                                {selectedMember.membershipPlans[0].endDate ? new Date(selectedMember.membershipPlans[0].endDate).toLocaleDateString() : 'N/A'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-gray-500">Status:</span>
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedMember.membershipPlans[0].isActive
                                                                    ? 'bg-green-900 text-green-300 border border-green-700'
                                                                    : 'bg-red-900 text-red-300 border border-red-700'
                                                                }`}>
                                                                {selectedMember.membershipPlans[0].isActive ? 'Active' : 'Inactive'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                                            <button
                                                onClick={closeModal}
                                                className="px-6 py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all"
                                            >
                                                Close
                                            </button>
                                            <button
                                                onClick={() => setEditMode(true)}
                                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                                Edit Profile
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MembersList;