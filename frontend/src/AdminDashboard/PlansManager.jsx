// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

// const PlansManager = () => {
//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // For form inputs
//     const [form, setForm] = useState({
//         name: '',
//         price: '',
//         description: '',
//     });

//     // For edit/view modal
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);

//     // Fetch all plans
//     const fetchPlans = async () => {
//         try {
//             setLoading(true);
//             const res = await axios.get(`${API_BASE}/api/plans`);
//             setPlans(res.data.plans);
//             setLoading(false);
//         } catch (err) {
//             setError('Failed to load plans');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPlans();
//     }, []);

//     // Handle form input changes
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     // Add new plan
//     const handleAddPlan = async () => {
//         if (!form.name || !form.price) {
//             alert('Name and price are required');
//             return;
//         }
//         try {
//             await axios.post(`${API_BASE}/api/plans`, {
//                 name: form.name,
//                 price: Number(form.price),
//                 description: form.description,
//             });
//             alert('Plan added successfully');
//             setForm({ name: '', price: '', description: '' });
//             fetchPlans();
//         } catch (err) {
//             alert('Failed to add plan');
//         }
//     };

//     // Select plan to view/edit
//     const handleSelectPlan = (plan) => {
//         setSelectedPlan(plan);
//         setForm({
//             name: plan.name,
//             price: plan.price,
//             description: plan.description || '',
//         });
//         setIsEditing(false);
//     };

//     // Delete plan
//     const handleDeletePlan = async (planId) => {
//         if (!window.confirm('Are you sure you want to delete this plan?')) return;
//         try {
//             await axios.delete(`${API_BASE}/api/plans/${planId}`);
//             alert('Plan deleted');
//             if (selectedPlan?._id === planId) setSelectedPlan(null);
//             fetchPlans();
//         } catch (err) {
//             alert('Failed to delete plan');
//         }
//     };

//     // Enable edit mode
//     const startEdit = () => {
//         setIsEditing(true);
//     };

//     // Cancel edit mode
//     const cancelEdit = () => {
//         if (selectedPlan) {
//             setForm({
//                 name: selectedPlan.name,
//                 price: selectedPlan.price,
//                 description: selectedPlan.description || '',
//             });
//         }
//         setIsEditing(false);
//     };

//     // Update plan
//     const handleUpdatePlan = async () => {
//         if (!form.name || !form.price) {
//             alert('Name and price are required');
//             return;
//         }
//         try {
//             await axios.put(`${API_BASE}/api/plans/${selectedPlan._id}`, {
//                 name: form.name,
//                 price: Number(form.price),
//                 description: form.description,
//             });
//             alert('Plan updated');
//             setIsEditing(false);
//             fetchPlans();
//             // Update selectedPlan to latest data
//             setSelectedPlan({ ...selectedPlan, ...form, price: Number(form.price) });
//         } catch (err) {
//             alert('Failed to update plan');
//         }
//     };

//     return (
//         <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg">
//             <h1 className="text-3xl font-bold mb-6">Plans Management</h1>

//             {/* Add New Plan */}
//             <div className="mb-6 p-4 border rounded bg-gray-50">
//                 <h2 className="text-xl font-semibold mb-2">Add New Plan</h2>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Plan Name"
//                         value={form.name}
//                         onChange={handleChange}
//                         className="p-2 border rounded flex-1"
//                     />
//                     <input
//                         type="number"
//                         name="price"
//                         placeholder="Price"
//                         value={form.price}
//                         onChange={handleChange}
//                         className="p-2 border rounded w-32"
//                         min="0"
//                     />
//                     <input
//                         type="text"
//                         name="description"
//                         placeholder="Description (optional)"
//                         value={form.description}
//                         onChange={handleChange}
//                         className="p-2 border rounded flex-1"
//                     />
//                     <button
//                         onClick={handleAddPlan}
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                         Add Plan
//                     </button>
//                 </div>
//             </div>

//             {/* Plans List */}
//             <div className="overflow-x-auto">
//                 {loading ? (
//                     <p>Loading plans...</p>
//                 ) : error ? (
//                     <p className="text-red-500">{error}</p>
//                 ) : plans.length === 0 ? (
//                     <p>No plans found.</p>
//                 ) : (
//                     <table className="min-w-full border border-gray-300 rounded text-left text-sm">
//                         <thead className="bg-gray-200 font-semibold">
//                             <tr>
//                                 <th className="p-3 border-r border-gray-300">Name</th>
//                                 <th className="p-3 border-r border-gray-300">Price</th>
//                                 <th className="p-3 border-r border-gray-300">Description</th>
//                                 <th className="p-3 border-r border-gray-300">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {plans.map((plan) => (
//                                 <tr key={plan._id} className="hover:bg-gray-100">
//                                     <td className="p-3 border-r border-gray-300">{plan.name}</td>
//                                     <td className="p-3 border-r border-gray-300">${plan.price.toFixed(2)}</td>
//                                     <td className="p-3 border-r border-gray-300">{plan.description || '-'}</td>
//                                     <td className="p-3 border-r border-gray-300 space-x-2">
//                                         <button
//                                             onClick={() => handleSelectPlan(plan)}
//                                             className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                                         >
//                                             View
//                                         </button>
//                                         <button
//                                             onClick={() => handleDeletePlan(plan._id)}
//                                             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>

//             {/* View/Edit Plan Details */}
//             {selectedPlan && (
//                 <div className="mt-8 p-6 border rounded bg-gray-50 max-w-xl">
//                     <h2 className="text-2xl font-semibold mb-4">Plan Details</h2>

//                     <div className="flex flex-col gap-4">
//                         <label>
//                             Name:
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={form.name}
//                                 onChange={handleChange}
//                                 disabled={!isEditing}
//                                 className={`mt-1 p-2 border rounded w-full ${isEditing ? '' : 'bg-gray-100'}`}
//                             />
//                         </label>

//                         <label>
//                             Price:
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={form.price}
//                                 onChange={handleChange}
//                                 disabled={!isEditing}
//                                 className={`mt-1 p-2 border rounded w-full ${isEditing ? '' : 'bg-gray-100'}`}
//                                 min="0"
//                             />
//                         </label>

//                         <label>
//                             Description:
//                             <textarea
//                                 name="description"
//                                 value={form.description}
//                                 onChange={handleChange}
//                                 disabled={!isEditing}
//                                 className={`mt-1 p-2 border rounded w-full ${isEditing ? '' : 'bg-gray-100'}`}
//                             />
//                         </label>

//                         {/* Edit / Update Buttons */}
//                         {!isEditing ? (
//                             <button
//                                 onClick={startEdit}
//                                 className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-fit"
//                             >
//                                 Edit
//                             </button>
//                         ) : (
//                             <div className="flex space-x-4">
//                                 <button
//                                     onClick={handleUpdatePlan}
//                                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                                 >
//                                     Update
//                                 </button>
//                                 <button
//                                     onClick={cancelEdit}
//                                     className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PlansManager;


import { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Eye, DollarSign, Package, FileText, Save, X, CheckCircle, AlertCircle } from 'lucide-react';

import axios from 'axios';

const PlansManager = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // For form inputs
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
    });

    // For edit/view modal
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

    // Fetch all plans
    const fetchPlans = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE}/api/plans`);
            setPlans(res.data.plans);

            // Simulate API call
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (err) {
            setError('Failed to load plans');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    // Show success message
    const showSuccess = (message) => {
        setSuccess(message);
        setTimeout(() => setSuccess(null), 3000);
    };

    // Show error message
    const showError = (message) => {
        setError(message);
        setTimeout(() => setError(null), 3000);
    };

    // Handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add new plan
    const handleAddPlan = async () => {
        if (!form.name || !form.price) {
            showError('Name and price are required');
            return;
        }
        try {
            await axios.post(`${API_BASE}/api/plans`, {
                name: form.name,
                price: Number(form.price),
                description: form.description,
            });

            // Simulate API call
            const newPlan = {
                _id: Date.now().toString(),
                name: form.name,
                price: Number(form.price),
                description: form.description
            };
            setPlans([...plans, newPlan]);

            showSuccess('Plan added successfully! 🎉');
            setForm({ name: '', price: '', description: '' });
            setShowAddForm(false);
            // fetchPlans();
        } catch (err) {
            showError('Failed to add plan');
        }
    };

    // Select plan to view/edit
    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
        setForm({
            name: plan.name,
            price: plan.price,
            description: plan.description || '',
        });
        setIsEditing(false);
    };

    // Delete plan
    const handleDeletePlan = async (planId) => {
        try {
            await axios.delete(`${API_BASE}/api/plans/${planId}`);

            // Simulate API call
            setPlans(plans.filter(plan => plan._id !== planId));

            showSuccess('Plan deleted successfully');
            if (selectedPlan?._id === planId) setSelectedPlan(null);
            // fetchPlans();
        } catch (err) {
            showError('Failed to delete plan');
        }
    };

    // Enable edit mode
    const startEdit = () => {
        setIsEditing(true);
    };

    // Cancel edit mode
    const cancelEdit = () => {
        if (selectedPlan) {
            setForm({
                name: selectedPlan.name,
                price: selectedPlan.price,
                description: selectedPlan.description || '',
            });
        }
        setIsEditing(false);
    };

    // Update plan
    const handleUpdatePlan = async () => {
        if (!form.name || !form.price) {
            showError('Name and price are required');
            return;
        }
        try {
            await axios.put(`${API_BASE}/api/plans/${selectedPlan._id}`, {
                name: form.name,
                price: Number(form.price),
                description: form.description,
            });

            // Simulate API call
            const updatedPlans = plans.map(plan =>
                plan._id === selectedPlan._id
                    ? { ...plan, name: form.name, price: Number(form.price), description: form.description }
                    : plan
            );
            setPlans(updatedPlans);

            showSuccess('Plan updated successfully! ✨');
            setIsEditing(false);
            // fetchPlans();
            setSelectedPlan({ ...selectedPlan, ...form, price: Number(form.price) });
        } catch (err) {
            showError('Failed to update plan');
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

            <div className="relative p-4 sm:p-6 lg:p-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Plans Management
                        </h1>
                        <p className="text-gray-400 mt-2">Manage your gym membership plans</p>
                    </div>

                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New Plan</span>
                    </button>
                </div>

                {/* Alert Messages */}
                {error && (
                    <div className="p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200 animate-slide-down flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div className="p-4 bg-green-900/50 border border-green-500 rounded-xl text-green-200 animate-slide-down flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                {/* Add New Plan Form */}
                {showAddForm && (
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 animate-slide-down">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-blue-400 flex items-center">
                                <Plus className="w-5 h-5 mr-2" />
                                Add New Plan
                            </h2>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Plan Name *
                                </label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter plan name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Price *
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="0.00"
                                        value={form.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <textarea
                                        name="description"
                                        placeholder="Enter plan description (optional)"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleAddPlan}
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add Plan</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Plans Grid/Table */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : plans.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">No plans found</p>
                            <p className="text-gray-500 text-sm">Create your first membership plan to get started</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden lg:block">
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-800/50">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Plan Name</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Price</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Description</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800">
                                                {plans.map((plan, index) => (
                                                    <tr
                                                        key={plan._id}
                                                        className="hover:bg-gray-800/30 transition-colors duration-200 animate-fade-in"
                                                        style={{ animationDelay: `${index * 100}ms` }}
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium text-white">{plan.name}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-green-400 font-semibold">${plan.price.toFixed(2)}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-gray-400 text-sm truncate max-w-xs">
                                                                {plan.description || '-'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-center space-x-2">
                                                                <button
                                                                    onClick={() => handleSelectPlan(plan)}
                                                                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:scale-110"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeletePlan(plan._id)}
                                                                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 hover:scale-110"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {plans.map((plan, index) => (
                                    <div
                                        key={plan._id}
                                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:scale-105 animate-fade-in"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                                                <p className="text-2xl font-bold text-green-400">${plan.price.toFixed(2)}</p>
                                            </div>
                                            <Package className="w-8 h-8 text-blue-400" />
                                        </div>

                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {plan.description || 'No description provided'}
                                        </p>

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleSelectPlan(plan)}
                                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 hover:scale-105"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>View</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeletePlan(plan._id)}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-200 hover:scale-105"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* View/Edit Plan Details Modal */}
                {selectedPlan && (
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 animate-slide-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-blue-400 flex items-center">
                                <Package className="w-6 h-6 mr-2" />
                                Plan Details
                            </h2>
                            <button
                                onClick={() => setSelectedPlan(null)}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Plan Name
                                </label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl transition-all duration-200 ${isEditing
                                                ? 'bg-gray-800/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                : 'bg-gray-800/30 text-gray-300'
                                            }`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Price
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        min="0"
                                        step="0.01"
                                        className={`w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl transition-all duration-200 ${isEditing
                                                ? 'bg-gray-800/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                : 'bg-gray-800/30 text-gray-300'
                                            }`}
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows="4"
                                        className={`w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl transition-all duration-200 resize-none ${isEditing
                                                ? 'bg-gray-800/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                : 'bg-gray-800/30 text-gray-300'
                                            }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                            {!isEditing ? (
                                <button
                                    onClick={startEdit}
                                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                                >
                                    <Edit3 className="w-5 h-5" />
                                    <span>Edit Plan</span>
                                </button>
                            ) : (
                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                    <button
                                        onClick={handleUpdatePlan}
                                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                                    >
                                        <Save className="w-5 h-5" />
                                        <span>Update Plan</span>
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                                    >
                                        <X className="w-5 h-5" />
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.4s ease-out;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default PlansManager;