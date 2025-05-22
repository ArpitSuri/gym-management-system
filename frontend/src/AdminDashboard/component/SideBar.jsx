// components/Sidebar.jsx
// import { NavLink } from 'react-router-dom';
// import { FaUsers, FaUserPlus, FaChartBar, FaClipboardList, FaCalendarCheck, FaCog } from 'react-icons/fa';

// const Sidebar = () => {
//     const navItems = [
//         { name: 'Dashboard', path: '/adminDashboard', icon: <FaChartBar /> },
//         { name: 'Members', path: '/adminDashboard/members', icon: <FaUsers /> },
//         { name: 'Register Member', path: '/adminDashboard/register', icon: <FaUserPlus /> },
//         { name: 'Attendance', path: '/adminDashboard/attendance', icon: <FaCalendarCheck /> },
//         { name: 'Plans', path: '/adminDashboard/plans', icon: <FaClipboardList /> },
//         { name: 'Settings', path: '/adminDashboard/settings', icon: <FaCog /> }
//     ];

//     return (
//         <div className="h-screen w-64 bg-blue-800 text-white fixed top-0 left-0 shadow-lg">
//             <div className="text-2xl font-bold p-6 border-b border-blue-700">🏋️ Gym adminDashboard</div>
//             <nav className="flex flex-col p-4 space-y-4">
//                 {navItems.map((item) => (
//                     <NavLink
//                         key={item.name}
//                         to={item.path}
//                         className={({ isActive }) =>
//                             `flex items-center space-x-3 p-2 rounded hover:bg-blue-700 transition ${isActive ? 'bg-blue-700' : ''
//                             }`
//                         }
//                     >
//                         <span>{item.icon}</span>
//                         <span>{item.name}</span>
//                     </NavLink>
//                 ))}
//             </nav>
//         </div>
//     );
// };

// export default Sidebar;


import React from 'react';
import { Home, Users, UserPlus, BarChart3, ClipboardList, Calendar, Settings, Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/adminDashboard', icon: <Home className="w-6 h-6" /> },
        { name: 'Members', path: '/adminDashboard/members', icon: <Users className="w-6 h-6" /> },
        { name: 'Register Member', path: '/adminDashboard/register', icon: <UserPlus className="w-6 h-6" /> },
        { name: 'Attendance', path: '/adminDashboard/attendance', icon: <Calendar className="w-6 h-6" /> },
        { name: 'Plans', path: '/adminDashboard/plans', icon: <ClipboardList className="w-6 h-6" /> },
        // { name: 'Analytics', path: '/adminDashboard/analytics', icon: <BarChart3 className="w-6 h-6" /> },
        // { name: 'Settings', path: '/adminDashboard/settings', icon: <Settings className="w-6 h-6" /> }
    ];

    const handleLogout = () => {
        // Clear the JWT token from localStorage
        localStorage.removeItem("authToken");


        // Redirect to login or homepage
        window.location.href = "/login";
    };
      

    const [activeItem, setActiveItem] = React.useState('Dashboard');
    const navigate= useNavigate();

    const handleNavClick = (itemName, path) => {
        setActiveItem(itemName);
        // In your actual implementation, you would use React Router navigation here
        // console.log(`Navigating to: ${path}`);
        navigate(path);
    
    };

    return (
        <div className="h-screen w-64 bg-black border-r border-gray-800 text-white fixed top-0 left-0 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                    <div className="w-20 h-20 bg-black rounded-xl flex items-center justify-center">
                        {/* <Dumbbell className="w-6 h-6 text-white" /> */}
                        <img src="/Logo.jpg" alt="Logo" className="w-full h-full rounded-full" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Gym Hub</h1>
                        <p className="text-xs text-gray-400">Admin Dashboard</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <div className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = activeItem === item.name;
                        return (
                            <button
                                key={item.name}
                                onClick={() => handleNavClick(item.name, item.path)}
                                className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-gray-800 text-white border border-gray-700'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                                    }`}
                            >
                                <span className={`transition-colors ${isActive ? 'text-blue-400' : 'group-hover:text-blue-400'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium text-left flex-1">{item.name}</span>
                                {isActive && (
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Logout
            </button>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-300">A</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">Admin</p>
                        <p className="text-xs text-gray-400">Gym Manager</p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
