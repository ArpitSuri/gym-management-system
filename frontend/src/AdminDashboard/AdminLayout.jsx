// layouts/AdminLayout.jsx


import { Outlet } from 'react-router-dom';
import Sidebar from './component/SideBar';

const AdminLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 w-full p-6 bg-black min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
