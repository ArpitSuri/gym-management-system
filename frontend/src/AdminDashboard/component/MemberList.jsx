import { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import MemberProfile from './MemberProfile';
import { User } from 'lucide-react';

const MembersList = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Members');

    const fetchMembers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members`);
            setMembers(res.data.members);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    useEffect(() => { fetchMembers(); }, []);



        const handleDelete = async (id) => {
            if (!confirm("Are you sure you want to delete this member?")) return;
            try {
                await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/${id}`);
                toast.success("Member deleted successfully.");
                fetchMembers();
            } catch (error) {
                console.error('Failed to delete member:', error);
            }

            // Mock delete for demo - remove this when uncommenting axios
            try {
                setMembers(members.filter(m => m._id !== id));
                console.log('Member deleted successfully.');
            } catch (error) {
                console.error('Failed to delete member:', error);
            }
        };

    const filteredMembers = members.filter(member => {
        const matchSearch =
            member.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phone?.includes(searchTerm);

        const matchStatus =
            filterStatus === 'All Members' ||
            (filterStatus === 'Active' && member.membershipPlans?.[0]?.isActive) ||
            (filterStatus === 'Inactive' && !member.membershipPlans?.[0]?.isActive);

        return matchSearch && matchStatus;
    });



    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="p-4 md:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">Gym Members</h1>
                        <p className="text-slate-400 text-sm md:text-base">Manage your community</p>
                    </div>
                    <div className="text-slate-400 text-sm md:text-base">
                        {members.length} members
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                            </svg>
                        </div>
                        <select
                            className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 min-w-[150px]"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All Members">All Members</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Members List */}
                <div className="space-y-4">
                    {filteredMembers.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-slate-400 text-lg mb-2">No members found</div>
                            <div className="text-slate-500 text-sm">
                                {searchTerm ? 'Try adjusting your search terms' : 'Add some members to get started'}
                            </div>
                        </div>
                    ) : (
                        filteredMembers.map((member, index) => (
                            <div
                                key={member._id}
                                className="bg-slate-800 rounded-lg p-4 md:p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/20 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-start sm:items-center space-x-4 mb-4 sm:mb-0">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0">
                                                                        {member.photoUrl ? (
                                                                                     <img
                                                                                         src={member.photoUrl}
                                                                                         className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-gray-700"
                                                                                         alt="Member"
                                                                                     />
                                                                                 ) : (
                                                                                     <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                                                                                         <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                                                                     </div>
                                                                                 )}
                              </div>

                                        {/* Member Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                                <h3 className="text-lg font-semibold text-white truncate">
                                                    {member.fullName}
                                                </h3>
                                                <div className="flex items-center mt-1 sm:mt-0">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.membershipPlans?.[0]?.isActive
                                                            ? 'bg-green-900 text-green-200 border border-green-700'
                                                            : 'bg-red-900 text-red-200 border border-red-700'
                                                        }`}>
                                                        {member.membershipPlans?.[0]?.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-2 space-y-1">
                                                <div className="flex items-center text-sm text-slate-400">
                                                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="truncate">{member.email}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-slate-400">
                                                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span>{member.phone}</span>
                                                </div>
                                            </div>

                                            {/* Additional Info */}
                                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                                                {member.gender && (
                                                    <span>{member.gender}</span>
                                                )}
                                                {member.membershipPlans?.[0]?.planName && (
                                                    <span>• {member.membershipPlans[0].planName}</span>
                                                )}
                                                {member.joinDate && (
                                                    <span>• Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                                        <button
                                            onClick={() => setSelectedMember(member)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                                        >
                                            View Profile
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors duration-200" onClick={() => handleDelete(member._id)}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Member Profile Modal */}
                      {selectedMember && (
                            <MemberProfile member={selectedMember} onClose={() => setSelectedMember(null)} />
                        )}

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default MembersList;