import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Menu } from 'lucide-react';
import Sidebar from './component/SideBar';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-black">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 min-h-screen bg-black text-white">
                {/* Top Bar with Hamburger for Mobile */}
                <div className="md:hidden flex items-center justify-between p-4 bg-black border-b border-gray-800">
                    <button onClick={() => setSidebarOpen(true)} className="text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-semibold">Gym Hub</h1>
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
