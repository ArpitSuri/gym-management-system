import { useState  , useEffect} from 'react';
import axios from 'axios';
import {toast} from "react-toastify";

const AddPlanModal = ({ memberId, onClose, onPlanAdded }) => {
    const [plans, setPlans] = useState([]);
    const [planDuration, setplanDuration] = useState('Monthly');
    const [startDate, setStartDate] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('');


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/plans`)
            .then(res => setPlans(res.data.plans))
            .catch(() => setPlans([]));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!startDate) {
            return toast.error("Start  date is required");
            return;
        }

        const planData = {
            planId: selectedPlan,
            option: planDuration,
            startDate,
        };



        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/plans/${memberId}/add-plan`, planData);
            toast.success("Plan added successfully");
            onPlanAdded(); // Refresh member data after plan added
            onClose();     // Close modal
        } catch (error) {
            console.error(error);
            toast.error("Failed to add plan");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-black border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white">Add Membership Plan</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-full"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">


                        {/* Plan Option */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Plan Options
                            </label>
                            <div className="relative">
                                <select name="plans" id="plans-dropdown" defaultValue=""
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                                    value={selectedPlan}
                                    onChange={(e) => setSelectedPlan(e.target.value)}>
                                    <option value="" disabled>Select a plan</option>
                                    {plans.map(plan => (
                                        <option key={plan._id} value={plan._id}>
                                            {plan.name} - &#8377;{plan.price}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-400 text-xs mt-2">Choose the membership duration that best fits your needs</p>
                        </div>

                        
                        {/* Plan Duration */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Plan Duration
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                                    value={planDuration}
                                    onChange={(e) => setplanDuration(e.target.value)}
                                >
                                    <option value="Monthly" className="bg-gray-800">Monthly Plan</option>
                                    <option value="Quarterly" className="bg-gray-800">Quarterly Plan</option>
                                    <option value="Half-Yearly" className="bg-gray-800">Half-Yearly Plan</option>
                                    <option value="Yearly" className="bg-gray-800">Yearly Plan</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-400 text-xs mt-2">Choose the membership duration that best fits your needs</p>
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Start Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 [color-scheme:dark]"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>


                        </div>

                     {/* Validation Warning */}
                        {/* {(!startDate || !endDate) && (startDate || endDate) && (
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-yellow-300 text-sm">Please select both start and end dates</span>
                                </div>
                            </div
                        )} */}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!startDate}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Add Plan
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Info */}
                <div className="px-6 pb-6">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-start space-x-3">
                            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <p className="text-white text-sm font-medium">Plan Information</p>
                                <p className="text-gray-400 text-xs mt-1">
                                    The new membership plan will be activated immediately and will override any existing expired plans.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlanModal;