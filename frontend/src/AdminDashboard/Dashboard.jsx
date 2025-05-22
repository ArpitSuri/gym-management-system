import React, { useEffect, useState } from 'react';
import { Users, UserCheck, Calendar, UserX, TrendingUp, Activity, BarChart3, Zap } from 'lucide-react';

import axios from 'axios';

// components/SummaryCard.jsx
const SummaryCard = ({ title, value, icon: Icon, trend, color = "blue" }) => {
    const colorClasses = {
        blue: "from-blue-500 to-blue-600 border-blue-500/20",
        green: "from-green-500 to-green-600 border-green-500/20",
        purple: "from-purple-500 to-purple-600 border-purple-500/20",
        red: "from-red-500 to-red-600 border-red-500/20",
        orange: "from-orange-500 to-orange-600 border-orange-500/20"
    };

    return (
        <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-300`}></div>

            {/* Icon */}
            <div className="relative flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend && (
                    <div className={`flex items-center space-x-1 text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'rotate-180' : ''}`} />
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="relative">
                <h3 className="text-gray-400 text-sm font-medium mb-2 group-hover:text-gray-300 transition-colors duration-200">
                    {title}
                </h3>
                <p className="text-white text-3xl font-bold tracking-tight mb-1">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
            </div>

            {/* Animated shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out rounded-2xl"></div>
        </div>
    );
};

// pages/Dashboard.jsx
const Dashboard = () => {
    const [stats, setStats] = useState({
        totalMembers: 245,
        activeMemberships: 198,
        todayAttendance: 89,
        absentees: 109
    });

    useEffect(() => {
        const fetchStats = async () => {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/admin/stats`);
            setStats(res.data);
        };
        fetchStats();

        // Simulate loading with animation
        const timer = setTimeout(() => {
            setStats({
                totalMembers: 245,
                activeMemberships: 198,
                todayAttendance: 89,
                absentees: 109
            });
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const cardData = [
        {
            title: "Total Members",
            value: stats.totalMembers,
            icon: Users,
            color: "blue",
            trend: 12
        },
        {
            title: "Active Memberships",
            value: stats.activeMemberships,
            icon: UserCheck,
            color: "green",
            trend: 8
        },
        {
            title: "Today's Attendance",
            value: stats.todayAttendance,
            icon: Activity,
            color: "purple",
            trend: -3
        },
        {
            title: "Absent Today",
            value: stats.absentees,
            icon: UserX,
            color: "red",
            trend: -15
        }
    ];

    return (
        <div className="bg-black text-white">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

            <div className="relative p-4 sm:p-6 lg:p-8 space-y-8">
                {/* Header Section */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm sm:text-base">
                                Monitor your gym's performance in real-time
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center space-x-3">
                            <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl transition-all duration-200 hover:scale-105">
                                <BarChart3 className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {cardData.map((card, index) => (
                        <div
                            key={card.title}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <SummaryCard
                                title={card.title}
                                value={card.value}
                                icon={card.icon}
                                color={card.color}
                                trend={card.trend}
                            />
                        </div>
                    ))}
                </div>

                {/* Additional Sections Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart Section */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white">Weekly Attendance</h2>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="h-48 flex items-center justify-center text-gray-500">
                            <div className="text-center space-y-2">
                                <BarChart3 className="w-12 h-12 mx-auto opacity-50" />
                                <p>Chart component will be integrated here</p>
                            </div>
                        </div>
                    </div>

            

                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;