// components/SummaryCard.jsx
import React, { useEffect, useState } from 'react';
import { Users, UserCheck, Calendar, UserX, TrendingUp, Activity, BarChart3, Zap } from 'lucide-react';

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
            {/* <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out rounded-2xl"></div> */}
        </div>
    );
};
export default SummaryCard;