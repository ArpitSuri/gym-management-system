import React from 'react';
import {
    Home, Users, UserPlus, ClipboardList, Calendar,
    Menu, X,
    NotebookPen,
    QrCode
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navItems = [
        { name: 'Dashboard', path: '/adminDashboard', icon: <Home className="w-6 h-6" /> },
        { name: 'Members', path: '/adminDashboard/members', icon: <Users className="w-6 h-6" /> },
        { name: 'Register Member', path: '/adminDashboard/register', icon: <UserPlus className="w-6 h-6" /> },
        { name: 'Attendance', path: '/adminDashboard/attendance', icon: <Calendar className="w-6 h-6" /> },
        { name: 'Plans', path: '/adminDashboard/plans', icon: <ClipboardList className="w-6 h-6" /> },
        { name: 'QR Codes', path: '/adminDashboard/qrcodes', icon: <QrCode className="w-6 h-6" /> },
    ];

    const [activeItem, setActiveItem] = React.useState('Dashboard');
    const navigate = useNavigate();

    const handleNavClick = (itemName, path) => {
        setActiveItem(itemName);
        navigate(path);
        toggleSidebar(false); // Close sidebar on mobile after selection
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-40 transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex md:flex-col border-r border-gray-800`}
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-800 flex items-center justify-between md:justify-start">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/adminDashboard')}>
                    <div className="w-14 h-14 bg-black rounded-full overflow-hidden">
                        <img src="/Logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Gym Hub</h1>
                        <p className="text-xs text-gray-400">Admin Dashboard</p>
                    </div>
                </div>
                <button onClick={() => toggleSidebar(false)} className="md:hidden text-white">
                    <X />
                </button>
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
                                className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
                                     ${isActive
                                    ? 'bg-gray-800 text-white border border-gray-700'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                                    }`}
                            >
                                <span className={`transition-colors ${isActive ? 'text-blue-400' : 'group-hover:text-blue-400'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium text-left flex-1">{item.name}</span>
                                {isActive && <div className="w-2 h-2 bg-blue-400 rounded-full"></div>}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-800">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white w-full px-4 py-2 rounded cursor-pointer">
                    Logout
                </button>

                <div className="mt-4 flex items-center space-x-3 px-4 py-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-300">A</span>
                    </div>
                    <div className="flex-1 cursor-pointer">
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
