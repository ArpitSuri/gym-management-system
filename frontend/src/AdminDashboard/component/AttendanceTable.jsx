// import React from "react";
// import axios from "axios";

// const AttendanceTable = ({ data, onRefresh }) => {
//     const handleManualCheckin = async (memberId) => {
//         try {
//             await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/attendance/manual-checkin`, { memberId });
//             onRefresh();
//         } catch (err) {
//             alert("Check-in failed");
//         }
//     };

//     return (
//         <table className="w-full text-left border mt-2">
//             <thead className="bg-gray-200">
//                 <tr><th className="p-2">Profile Pic</th>
//                     <th className="p-2">Name</th>
//                     <th className="p-2">Phone Number</th>
//                     <th className="p-2">Check-in Times</th>
//                     <th className="p-2">Status</th>
//                     <th className="p-2">Manual Check-in</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((entry) => (
//                     <tr key={entry.memberId}>
//                         <td className="p-3">
//                             {entry.photoUrl ? (
//                                 <img src={entry.photoUrl} className="h-10 w-10 rounded-full object-cover" alt="Member" />
//                             ) : (
//                                 <span className="text-gray-400">No Photo</span>
//                             )}
//                         </td>
//                         <td className="p-2">{entry.name}</td>
//                         <td className="p-2">{entry.phone}</td>
//                         <td className="p-2">
//                             {entry.checkIns.map((time, idx) => (
//                                 <div key={idx}>{new Date(time).toLocaleTimeString()}</div>
//                             ))}
//                         </td>
//                         <td className="p-2">
//                             {entry.checkIns.length > 0 ? (
//                                 <span className="text-green-600 font-bold">Present</span>
//                             ) : (
//                                 <span className="text-red-600 font-bold">Absent</span>
//                             )}
//                         </td>
//                         <td className="p-2">
//                             <button
//                                 onClick={() => handleManualCheckin(entry.memberId)}
//                                 className="bg-blue-500 text-white px-3 py-1 rounded"
//                             >
//                                 Check-in
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default AttendanceTable;


// import React, { useState, useMemo } from "react";
// import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
// import axios from "axios";

// const AttendanceTable = ({ data, onRefresh }) => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//     const [itemsPerPage] = useState(10);

//     const handleManualCheckin = async (memberId) => {
//             try {
//                 await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/attendance/manual-checkin`, { memberId });
//                 onRefresh();
//             } catch (err) {
//                 alert("Check-in failed");
//             }
//             };

//     const filteredData = useMemo(() => {
//         return data.filter(entry =>
//             entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             entry.phone.includes(searchTerm)
//         );
//     }, [data, searchTerm]);

//     const sortedData = useMemo(() => {
//         if (!sortConfig.key) return filteredData;

//         return [...filteredData].sort((a, b) => {
//             let aValue, bValue;

//             switch (sortConfig.key) {
//                 case 'name':
//                     aValue = a.name.toLowerCase();
//                     bValue = b.name.toLowerCase();
//                     break;
//                 case 'phone':
//                     aValue = a.phone;
//                     bValue = b.phone;
//                     break;
//                 case 'checkInTime':
//                     aValue = a.checkIns.length > 0 ? new Date(a.checkIns[a.checkIns.length - 1]) : new Date(0);
//                     bValue = b.checkIns.length > 0 ? new Date(b.checkIns[b.checkIns.length - 1]) : new Date(0);
//                     break;
//                 case 'status':
//                     aValue = a.checkIns.length > 0 ? 1 : 0;
//                     bValue = b.checkIns.length > 0 ? 1 : 0;
//                     break;
//                 default:
//                     return 0;
//             }

//             if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//             if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//             return 0;
//         });
//     }, [filteredData, sortConfig]);

//     const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//     const paginatedData = useMemo(() => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         return sortedData.slice(startIndex, startIndex + itemsPerPage);
//     }, [sortedData, currentPage, itemsPerPage]);

//     const handleSort = (key) => {
//         setSortConfig(prevConfig => ({
//             key,
//             direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
//         }));
//     };

//     const getSortIcon = (columnKey) => {
//         if (sortConfig.key !== columnKey) {
//             return <ArrowUpDown className="w-4 h-4 opacity-50" />;
//         }
//         return sortConfig.direction === 'asc'
//             ? <ArrowUp className="w-4 h-4 text-blue-500" />
//             : <ArrowDown className="w-4 h-4 text-blue-500" />;
//     };

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <div className="max-w-7xl mx-auto">
//                 <div className="bg-white rounded-lg shadow-sm border">
//                     <div className="p-6 border-b">
//                         <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
//                             <div>
//                                 <h2 className="text-2xl font-bold text-gray-900">Member Attendance</h2>
//                                 <p className="text-gray-600 mt-1">Track daily gym member check-ins</p>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <div className="relative">
//                                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search members..."
//                                         value={searchTerm}
//                                         onChange={(e) => {
//                                             setSearchTerm(e.target.value);
//                                             setCurrentPage(1);
//                                         }}
//                                         className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
//                                     />
//                                 </div>

//                                 <div className="flex gap-2 text-sm">
//                                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
//                                         Present: {sortedData.filter(entry => entry.checkIns.length > 0).length}
//                                     </span>
//                                     <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
//                                         Absent: {sortedData.filter(entry => entry.checkIns.length === 0).length}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gray-50 border-b">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Member
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         <button
//                                             onClick={() => handleSort('name')}
//                                             className="flex items-center gap-1 hover:text-gray-700 transition-colors"
//                                         >
//                                             Name
//                                             {getSortIcon('name')}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         <button
//                                             onClick={() => handleSort('phone')}
//                                             className="flex items-center gap-1 hover:text-gray-700 transition-colors"
//                                         >
//                                             Phone
//                                             {getSortIcon('phone')}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         <button
//                                             onClick={() => handleSort('checkInTime')}
//                                             className="flex items-center gap-1 hover:text-gray-700 transition-colors"
//                                         >
//                                             Check-in Times
//                                             {getSortIcon('checkInTime')}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         <button
//                                             onClick={() => handleSort('status')}
//                                             className="flex items-center gap-1 hover:text-gray-700 transition-colors"
//                                         >
//                                             Status
//                                             {getSortIcon('status')}
//                                         </button>
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {paginatedData.map((entry) => (
//                                     <tr key={entry.memberId} className="hover:bg-gray-50 transition-colors">
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {entry.photoUrl ? (
//                                                 <img
//                                                     src={entry.photoUrl}
//                                                     className="h-10 w-10 rounded-full object-cover"
//                                                     alt="Member"
//                                                 />
//                                             ) : (
//                                                 <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                                                     <span className="text-gray-500 font-medium text-sm">
//                                                         {entry.name.charAt(0).toUpperCase()}
//                                                     </span>
//                                                 </div>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm font-medium text-gray-900">{entry.name}</div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm text-gray-500">{entry.phone}</div>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <div className="flex flex-wrap gap-1">
//                                                 {entry.checkIns.length > 0 ? (
//                                                     entry.checkIns.map((time, idx) => (
//                                                         <span
//                                                             key={idx}
//                                                             className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
//                                                         >
//                                                             {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                                         </span>
//                                                     ))
//                                                 ) : (
//                                                     <span className="text-sm text-gray-400">No check-ins</span>
//                                                 )}
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             {entry.checkIns.length > 0 ? (
//                                                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                                     Present
//                                                 </span>
//                                             ) : (
//                                                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                                     Absent
//                                                 </span>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                             <button
//                                                 onClick={() => handleManualCheckin(entry.memberId)}
//                                                 className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
//                                             >
//                                                 Check-in
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {paginatedData.length === 0 && (
//                         <div className="text-center py-12">
//                             <div className="text-gray-500">
//                                 {searchTerm ? 'No members found matching your search.' : 'No attendance data available.'}
//                             </div>
//                         </div>
//                     )}

//                     {totalPages > 1 && (
//                         <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//                             <div className="flex-1 flex justify-between sm:hidden">
//                                 <button
//                                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                                     disabled={currentPage === 1}
//                                     className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//                                 >
//                                     Previous
//                                 </button>
//                                 <button
//                                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                                     disabled={currentPage === totalPages}
//                                     className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                                 <div>
//                                     <p className="text-sm text-gray-700">
//                                         Showing{' '}
//                                         <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span>
//                                         {' '}to{' '}
//                                         <span className="font-medium">
//                                             {Math.min(currentPage * itemsPerPage, sortedData.length)}
//                                         </span>
//                                         {' '}of{' '}
//                                         <span className="font-medium">{sortedData.length}</span>
//                                         {' '}results
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                                         <button
//                                             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                                             disabled={currentPage === 1}
//                                             className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                                         >
//                                             <ChevronLeft className="h-5 w-5" />
//                                         </button>
//                                         {[...Array(totalPages)].map((_, i) => {
//                                             const page = i + 1;
//                                             return (
//                                                 <button
//                                                     key={page}
//                                                     onClick={() => setCurrentPage(page)}
//                                                     className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
//                                                             ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
//                                                             : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                                                         }`}
//                                                 >
//                                                     {page}
//                                                 </button>
//                                             );
//                                         })}
//                                         <button
//                                             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                                             disabled={currentPage === totalPages}
//                                             className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                                         >
//                                             <ChevronRight className="h-5 w-5" />
//                                         </button>
//                                     </nav>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AttendanceTable;


import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";


const AttendanceTable = ({ data, onRefresh }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [itemsPerPage] = useState(10);

    const handleManualCheckin = async (memberId) => {
        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/attendance/manual-checkin`, { memberId });
            // console.log(`Manual check-in for member: ${memberId}`);
            toast.success("Check-in successful");
            onRefresh();
        } catch (err) {
            toast.error("Check-in failed");
        }
    };

    const filteredData = useMemo(() => {
        return data.filter(entry =>
            entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.phone.includes(searchTerm)
        );
    }, [data, searchTerm]);

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            let aValue, bValue;

            switch (sortConfig.key) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'phone':
                    aValue = a.phone;
                    bValue = b.phone;
                    break;
                case 'checkInTime':
                    aValue = a.checkIns.length > 0 ? new Date(a.checkIns[a.checkIns.length - 1]) : new Date(0);
                    bValue = b.checkIns.length > 0 ? new Date(b.checkIns[b.checkIns.length - 1]) : new Date(0);
                    break;
                case 'status':
                    aValue = a.checkIns.length > 0 ? 1 : 0;
                    bValue = b.checkIns.length > 0 ? 1 : 0;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <ArrowUpDown className="w-4 h-4 text-gray-500" />;
        }
        return sortConfig.direction === 'asc'
            ? <ArrowUp className="w-4 h-4 text-cyan-400" />
            : <ArrowDown className="w-4 h-4 text-cyan-400" />;
    };

    // return (
    //     <div className="p-6 bg-black min-h-screen">
    //         <div className="max-w-7xl mx-auto">
    //             <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
    //                 <div className="p-6 border-b border-gray-800">
    //                     <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
    //                         <div>
    //                             <h2 className="text-3xl font-bold text-white">Member Attendance</h2>
    //                             <p className="text-gray-400 mt-1">Track daily gym member check-ins</p>
    //                         </div>

    //                         <div className="flex items-center gap-4">
    //                             <div className="relative">
    //                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    //                                 <input
    //                                     type="text"
    //                                     placeholder="Search members..."
    //                                     value={searchTerm}
    //                                     onChange={(e) => {
    //                                         setSearchTerm(e.target.value);
    //                                         setCurrentPage(1);
    //                                     }}
    //                                     className="pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 w-64 transition-all"
    //                                 />
    //                             </div>

    //                             <div className="flex gap-3 text-sm">
    //                                 <span className="bg-green-900 text-green-400 px-4 py-2 rounded-lg border border-green-700 shadow-lg shadow-green-500/20">
    //                                     Present: {sortedData.filter(entry => entry.checkIns.length > 0).length}
    //                                 </span>
    //                                 <span className="bg-red-900 text-red-400 px-4 py-2 rounded-lg border border-red-700 shadow-lg shadow-red-500/20">
    //                                     Absent: {sortedData.filter(entry => entry.checkIns.length === 0).length}
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="overflow-x-auto">
    //                     <table className="w-full">
    //                         <thead className="bg-gray-800 border-b border-gray-700">
    //                             <tr>
    //                                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
    //                                     Member
    //                                 </th>
    //                                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
    //                                     <button
    //                                         onClick={() => handleSort('name')}
    //                                         className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
    //                                     >
    //                                         Name
    //                                         {getSortIcon('name')}
    //                                     </button>
    //                                 </th>
    //                                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
    //                                     <button
    //                                         onClick={() => handleSort('phone')}
    //                                         className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
    //                                     >
    //                                         Phone
    //                                         {getSortIcon('phone')}
    //                                     </button>
    //                                 </th>
    //                                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
    //                                     <button
    //                                         onClick={() => handleSort('checkInTime')}
    //                                         className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
    //                                     >
    //                                         Check-in Times
    //                                         {getSortIcon('checkInTime')}
    //                                     </button>
    //                                 </th>
    //                                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
    //                                     <button
    //                                         onClick={() => handleSort('status')}
    //                                         className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
    //                                     >
    //                                         Status
    //                                         {getSortIcon('status')}
    //                                     </button>
    //                                 </th>
    //                                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
    //                                     Actions
    //                                 </th>
    //                             </tr>
    //                         </thead>
    //                         <tbody className="bg-gray-900 divide-y divide-gray-800">
    //                             {paginatedData.map((entry) => (
    //                                 <tr key={entry.memberId} className="hover:bg-gray-800 transition-all duration-300 group">
    //                                     <td className="px-6 py-4 whitespace-nowrap">
    //                                         {entry.photoUrl ? (
    //                                             <img
    //                                                 src={entry.photoUrl}
    //                                                 className="h-12 w-12 rounded-full object-cover border-2 border-gray-700 group-hover:border-cyan-400 transition-all"
    //                                                 alt="Member"
    //                                             />
    //                                         ) : (
    //                                             <div className="h-12 w-12 rounded-full bg-gray-800 border-2 border-gray-700 group-hover:border-cyan-400 flex items-center justify-center transition-all">
    //                                                 <span className="text-gray-300 font-bold text-lg">
    //                                                     {entry.name.charAt(0).toUpperCase()}
    //                                                 </span>
    //                                             </div>
    //                                         )}
    //                                     </td>
    //                                     <td className="px-6 py-4 whitespace-nowrap">
    //                                         <div className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
    //                                             {entry.name}
    //                                         </div>
    //                                     </td>
    //                                     <td className="px-6 py-4 whitespace-nowrap">
    //                                         <div className="text-gray-400 font-mono">{entry.phone}</div>
    //                                     </td>
    //                                     <td className="px-6 py-4">
    //                                         <div className="flex flex-wrap gap-2">
    //                                             {entry.checkIns.length > 0 ? (
    //                                                 entry.checkIns.map((time, idx) => (
    //                                                     <span
    //                                                         key={idx}
    //                                                         className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-cyan-900 text-cyan-300 border border-cyan-700 shadow-md shadow-cyan-500/20"
    //                                                     >
    //                                                         {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    //                                                     </span>
    //                                                 ))
    //                                             ) : (
    //                                                 <span className="text-gray-500 text-sm">No check-ins</span>
    //                                             )}
    //                                         </div>
    //                                     </td>
    //                                     <td className="px-6 py-4 whitespace-nowrap">
    //                                         {entry.checkIns.length > 0 ? (
    //                                             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-400 border border-green-700 shadow-lg shadow-green-500/30">
    //                                                 <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
    //                                                 Present
    //                                             </span>
    //                                         ) : (
    //                                             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-900 text-red-400 border border-red-700 shadow-lg shadow-red-500/30">
    //                                                 <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
    //                                                 Absent
    //                                             </span>
    //                                         )}
    //                                     </td>
    //                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
    //                                         <button
    //                                             onClick={() => handleManualCheckin(entry.memberId)}
    //                                             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
    //                                         >
    //                                             Check-in
    //                                         </button>
    //                                     </td>
    //                                 </tr>
    //                             ))}
    //                         </tbody>
    //                     </table>
    //                 </div>

    //                 {paginatedData.length === 0 && (
    //                     <div className="text-center py-16">
    //                         <div className="text-gray-500 text-xl">
    //                             {searchTerm ? 'No members found matching your search.' : 'No attendance data available.'}
    //                         </div>
    //                     </div>
    //                 )}

    //                 {totalPages > 1 && (
    //                     <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-700">
    //                         <div className="flex-1 flex justify-between sm:hidden">
    //                             <button
    //                                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    //                                 disabled={currentPage === 1}
    //                                 className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-all"
    //                             >
    //                                 Previous
    //                             </button>
    //                             <button
    //                                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    //                                 disabled={currentPage === totalPages}
    //                                 className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-all"
    //                             >
    //                                 Next
    //                             </button>
    //                         </div>
    //                         <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
    //                             <div>
    //                                 <p className="text-sm text-gray-400">
    //                                     Showing{' '}
    //                                     <span className="font-medium text-cyan-400">{((currentPage - 1) * itemsPerPage) + 1}</span>
    //                                     {' '}to{' '}
    //                                     <span className="font-medium text-cyan-400">
    //                                         {Math.min(currentPage * itemsPerPage, sortedData.length)}
    //                                     </span>
    //                                     {' '}of{' '}
    //                                     <span className="font-medium text-cyan-400">{sortedData.length}</span>
    //                                     {' '}results
    //                                 </p>
    //                             </div>
    //                             <div>
    //                                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
    //                                     <button
    //                                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    //                                         disabled={currentPage === 1}
    //                                         className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 transition-all"
    //                                     >
    //                                         <ChevronLeft className="h-5 w-5" />
    //                                     </button>
    //                                     {[...Array(Math.min(totalPages, 5))].map((_, i) => {
    //                                         const page = i + 1;
    //                                         return (
    //                                             <button
    //                                                 key={page}
    //                                                 onClick={() => setCurrentPage(page)}
    //                                                 className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all ${currentPage === page
    //                                                         ? 'z-10 bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-500/30'
    //                                                         : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
    //                                                     }`}
    //                                             >
    //                                                 {page}
    //                                             </button>
    //                                         );
    //                                     })}
    //                                     <button
    //                                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    //                                         disabled={currentPage === totalPages}
    //                                         className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 transition-all"
    //                                     >
    //                                         <ChevronRight className="h-5 w-5" />
    //                                     </button>
    //                                 </nav>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div className="p-4 sm:p-6 bg-black min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
                    <div className="p-4 sm:p-6 border-b border-gray-800">
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white">Member Attendance</h2>
                                <p className="text-gray-400 mt-1 text-sm sm:text-base">Track daily gym member check-ins</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search members..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                                    />
                                </div>

                                <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm">
                                    <span className="bg-green-900 text-green-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-green-700 shadow-md shadow-green-500/20">
                                        Present: {sortedData.filter(entry => entry.checkIns.length > 0).length}
                                    </span>
                                    <span className="bg-red-900 text-red-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-red-700 shadow-md shadow-red-500/20">
                                        Absent: {sortedData.filter(entry => entry.checkIns.length === 0).length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-800 border-b border-gray-700 text-xs sm:text-sm">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-gray-300">Member</th>
                                    <th className="px-4 sm:px-6 py-3">
                                        <button onClick={() => handleSort('name')} className="flex items-center gap-1 sm:gap-2 text-left text-gray-300 hover:text-cyan-400 transition-colors">
                                            Name {getSortIcon('name')}
                                        </button>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">
                                        <button onClick={() => handleSort('phone')} className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                                            Phone {getSortIcon('phone')}
                                        </button>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 hidden md:table-cell">
                                        <button onClick={() => handleSort('checkInTime')} className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                                            Check-ins {getSortIcon('checkInTime')}
                                        </button>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3">
                                        <button onClick={() => handleSort('status')} className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                                            Status {getSortIcon('status')}
                                        </button>
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-900 divide-y divide-gray-800">
                                {paginatedData.map(entry => (
                                    <tr key={entry.memberId} className="hover:bg-gray-800 transition">
                                        <td className="px-4 sm:px-6 py-3">
                                            {entry.photoUrl ? (
                                                <img src={entry.photoUrl} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-gray-700" alt="Member" />
                                            ) : (
                                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-white font-bold">
                                                    {entry.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 text-white">{entry.name}</td>
                                        <td className="px-4 sm:px-6 py-3 hidden sm:table-cell text-gray-400">{entry.phone}</td>
                                        <td className="px-4 sm:px-6 py-3 hidden md:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {entry.checkIns.length > 0
                                                    ? entry.checkIns.map((t, i) => (
                                                        <span key={i} className="bg-cyan-900 text-cyan-300 px-2 py-1 rounded text-xs border border-cyan-700">
                                                            {new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    ))
                                                    : <span className="text-gray-500">No check-ins</span>
                                                }
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-3">
                                            {entry.checkIns.length > 0 ? (
                                                <span className="flex items-center px-3 py-1 rounded-full bg-green-900 text-green-400 border border-green-700">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                                    Present
                                                </span>
                                            ) : (
                                                <span className="flex items-center px-3 py-1 rounded-full bg-red-900 text-red-400 border border-red-700">
                                                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                                                    Absent
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 sm:px-6 py-3">
                                            <button onClick={() => handleManualCheckin(entry.memberId)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-md text-sm transition transform hover:scale-105 shadow">
                                                Check-in
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-t border-gray-800 text-white text-sm">
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="flex items-center gap-1 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50">
                            <ChevronLeft className="w-4 h-4" /> Prev
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="flex items-center gap-1 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50">
                            Next <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default AttendanceTable;