import React from 'react';

const GymWebsite = () => {
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Responsive Navigation */}
            <nav className="bg-white shadow-md fixed w-full z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <a href="#" className="text-2xl font-bold text-gray-800">PowerFlex Gym</a>
                        </div>
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
                            <a href="#classes" className="text-gray-600 hover:text-gray-900">Classes</a>
                            <a href="#trainers" className="text-gray-600 hover:text-gray-900">Trainers</a>
                            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Membership</a>
                            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
                        </div>
                        <button className="md:hidden text-gray-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-24 pb-20 px-4 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Transform Your Body</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Join our premium fitness community and achieve your dream physique</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                    Start Free Trial
                </button>
            </header>

            {/* Featured Classes */}
            <section id="classes" className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Popular Classes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2">CrossFit Training</h3>
                            <p className="text-gray-600">High-intensity interval training</p>
                        </div>
                        {/* Add more class cards */}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Membership Plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-4">Basic</h3>
                            <p className="text-4xl font-bold mb-4">$29<span className="text-base">/month</span></p>
                            <ul className="space-y-3 mb-6">
                                <li>Gym Access</li>
                                <li>Basic Equipment</li>
                                <li>1 Class/Week</li>
                            </ul>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                                Choose Plan
                            </button>
                        </div>
                        {/* Add more pricing tiers */}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-xl font-semibold mb-4">PowerFlex Gym</h4>
                        <p className="text-gray-400">© 2025 All rights reserved</p>
                    </div>
                    {/* Add footer columns */}
                </div>
            </footer>
        </div>
    );
};

export default GymWebsite;
