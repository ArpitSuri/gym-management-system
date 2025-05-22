// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RegisterMember = () => {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         gender: 'Male',
//         dateOfBirth: '',
//         address: '',
//         emergencyContact: {
//             name: '',
//             phone: '',
//             relationship: ''
//         },
//         membershipPlan: {
//             planId: '',
//             startDate: '',
//             option: 'monthly'
//         },
//         photo: null
//     });

//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/plans`)
//             .then(res => setPlans(res.data.plans))
//             .catch(() => setPlans([]));
//     }, []);

//     const handleChange = e => {
//         const { name, value } = e.target;
//         if (name.startsWith('emergencyContact.')) {
//             const key = name.split('.')[1];
//             setFormData(prev => ({
//                 ...prev,
//                 emergencyContact: {
//                     ...prev.emergencyContact,
//                     [key]: value
//                 }
//             }));
//         } else if (name.startsWith('membershipPlan.')) {
//             const key = name.split('.')[1];
//             setFormData(prev => ({
//                 ...prev,
//                 membershipPlan: {
//                     ...prev.membershipPlan,
//                     [key]: value
//                 }
//             }));
//         } else if (name === 'photo') {
//             setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccess('');

//         try {
//             const data = new FormData();
//             data.append('fullName', formData.fullName);
//             data.append('email', formData.email);
//             data.append('phone', formData.phone);
//             data.append('gender', formData.gender);
//             data.append('dateOfBirth', formData.dateOfBirth);
//             data.append('address', formData.address);
//             data.append('emergencyContact[name]', formData.emergencyContact.name);
//             data.append('emergencyContact[phone]', formData.emergencyContact.phone);
//             data.append('emergencyContact[relationship]', formData.emergencyContact.relationship);
//             data.append('membershipPlan[planId]', formData.membershipPlan.planId);
//             data.append('membershipPlan[startDate]', formData.membershipPlan.startDate);
//             data.append('membershipPlan[option]', formData.membershipPlan.option);
//             if (formData.photo) data.append('photo', formData.photo);

//             const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/register`, data, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });

//             setSuccess(res.data.message);
//             setFormData({
//                 fullName: '',
//                 email: '',
//                 phone: '',
//                 gender: 'Male',
//                 dateOfBirth: '',
//                 address: '',
//                 emergencyContact: { name: '', phone: '', relationship: '' },
//                 membershipPlan: { planId: '', startDate: '', option: 'monthly' },
//                 photo: null
//             });
//         } catch (err) {
//             setError(err.response?.data?.error || 'Failed to register member');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//             <h2 className="text-2xl font-bold mb-4 text-center">Register Member</h2>

//             {error && <p className="text-red-600 mb-3">{error}</p>}
//             {success && <p className="text-green-600 mb-3">{success}</p>}

//             <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
//                 <div>
//                     <label className="block font-semibold">Full Name*</label>
//                     <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" required />
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Email*</label>
//                     <input type="email" name="email" value={formData.email} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" required />
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Phone*</label>
//                     <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" required />
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Gender*</label>
//                     <select name="gender" value={formData.gender} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" required>
//                         <option>Male</option>
//                         <option>Female</option>
//                         <option>Other</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Date of Birth</label>
//                     <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" />
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Address</label>
//                     <textarea name="address" value={formData.address} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" />
//                 </div>

//                 <hr className="my-4" />
//                 <h3 className="text-lg font-semibold">Emergency Contact</h3>

//                 <div>
//                     <label className="block font-semibold">Name</label>
//                     <input type="text" name="emergencyContact.name" value={formData.emergencyContact.name} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" />
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Phone</label>
//                     <input type="tel" name="emergencyContact.phone" value={formData.emergencyContact.phone} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" />
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Relationship</label>
//                     <input type="text" name="emergencyContact.relationship" value={formData.emergencyContact.relationship} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" />
//                 </div>

//                 <hr className="my-4" />
//                 <h3 className="text-lg font-semibold">Membership Plan</h3>

//                 <div>
//                     <label className="block font-semibold">Plan*</label>
//                     <select name="membershipPlan.planId" value={formData.membershipPlan.planId} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" required>
//                         <option value="">Select Plan</option>
//                         {plans.map(plan => (
//                             <option key={plan._id} value={plan._id}>
//                                 {plan.name} ({plan.option})
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Start Date*</label>
//                     <input type="date" name="membershipPlan.startDate" value={formData.membershipPlan.startDate} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" required />
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Option*</label>
//                     <select name="membershipPlan.option" value={formData.membershipPlan.option} onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" required>
//                         <option value="halfmonth">Half Month</option>
//                         <option value="monthly">Monthly</option>
//                         <option value="quarterly">Quarterly</option>
//                         <option value="halfyear">Half Year</option>
//                         <option value="yearly">Yearly</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block font-semibold">Photo</label>
//                     <input type="file" name="photo" accept="image/*" onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded" />
//                 </div>

//                 <button type="submit" disabled={loading}
//                     className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
//                     {loading ? 'Registering...' : 'Register Member'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default RegisterMember;




import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, MapPin, UserPlus, Upload, Heart, CreditCard } from 'lucide-react';
import axios from 'axios';

const RegisterMember = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: 'Male',
        dateOfBirth: '',
        address: '',
        emergencyContact: {
            name: '',
            phone: '',
            relationship: ''
        },
        membershipPlan: {
            planId: '',
            startDate: '',
            option: 'monthly'
        },
        photo: null
    });

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

        useEffect(() => {
            axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/plans`)
                .then(res => setPlans(res.data.plans))
                .catch(() => setPlans([]));
        }, []);


    const handleChange = e => {
        const { name, value } = e.target;
        if (name.startsWith('emergencyContact.')) {
            const key = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                emergencyContact: {
                    ...prev.emergencyContact,
                    [key]: value
                }
            }));
        } else if (name.startsWith('membershipPlan.')) {
            const key = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                membershipPlan: {
                    ...prev.membershipPlan,
                    [key]: value
                }
            }));
        } else if (name === 'photo') {
            setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };


        const handleSubmit = async e => {
            e.preventDefault();
            setLoading(true);
            setError('');
            setSuccess('');

            try {
                const data = new FormData();
                data.append('fullName', formData.fullName);
                data.append('email', formData.email);
                data.append('phone', formData.phone);
                data.append('gender', formData.gender);
                data.append('dateOfBirth', formData.dateOfBirth);
                data.append('address', formData.address);
                data.append('emergencyContact[name]', formData.emergencyContact.name);
                data.append('emergencyContact[phone]', formData.emergencyContact.phone);
                data.append('emergencyContact[relationship]', formData.emergencyContact.relationship);
                data.append('membershipPlan[planId]', formData.membershipPlan.planId);
                data.append('membershipPlan[startDate]', formData.membershipPlan.startDate);
                data.append('membershipPlan[option]', formData.membershipPlan.option);
                if (formData.photo) data.append('photo', formData.photo);

                const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members/register`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                setSuccess(res.data.message);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    gender: 'Male',
                    dateOfBirth: '',
                    address: '',
                    emergencyContact: { name: '', phone: '', relationship: '' },
                    membershipPlan: { planId: '', startDate: '', option: 'monthly' },
                    photo: null
                });
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to register member');
            } finally {
                setLoading(false);
            }
        };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const isStepValid = () => {
        if (currentStep === 1) {
            return formData.fullName && formData.email && formData.phone && formData.gender;
        }
        if (currentStep === 2) {
            return true; // Emergency contact is optional
        }
        if (currentStep === 3) {
            return formData.membershipPlan.planId && formData.membershipPlan.startDate;
        }
        return false;
    };

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4 animate-bounce">
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Join Our Gym
                    </h1>
                    <p className="text-gray-400 mt-2">Start your fitness journey today</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${currentStep >= step
                                        ? 'bg-blue-500 text-white scale-110'
                                        : 'bg-gray-700 text-gray-400'
                                    }`}>
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div className={`h-1 w-20 mx-2 transition-all duration-500 ${currentStep > step ? 'bg-blue-500' : 'bg-gray-700'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Personal Info</span>
                        <span>Emergency Contact</span>
                        <span>Membership</span>
                    </div>
                </div>

                {/* Alert Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-900 bg-opacity-50 border border-red-500 rounded-xl text-red-200 animate-slide-down">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 bg-green-900 bg-opacity-50 border border-green-500 rounded-xl text-green-200 animate-slide-down">
                        {success}
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-2xl">
                    <div className="space-y-6">

                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-slide-in">
                                <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2" />
                                    Personal Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Phone *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                                placeholder="+1 (555) 123-4567"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Gender *
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                            required
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Date of Birth
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Address
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows="3"
                                                className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200 resize-none"
                                                placeholder="Enter your address"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Emergency Contact */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-slide-in">
                                <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                                    <Heart className="w-5 h-5 mr-2" />
                                    Emergency Contact
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Contact Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="emergencyContact.name"
                                                value={formData.emergencyContact.name}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                                placeholder="Emergency contact name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Contact Phone
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="emergencyContact.phone"
                                                value={formData.emergencyContact.phone}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                                placeholder="Contact phone number"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Relationship
                                        </label>
                                        <input
                                            type="text"
                                            name="emergencyContact.relationship"
                                            value={formData.emergencyContact.relationship}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                            placeholder="e.g., Parent, Spouse, Friend"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Profile Photo
                                        </label>
                                        <div className="relative">
                                            <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="file"
                                                name="photo"
                                                accept="image/*"
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Membership Plan */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-slide-in">
                                <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    Membership Plan
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Select Plan *
                                        </label>
                                        <select
                                            name="membershipPlan.planId"
                                            value={formData.membershipPlan.planId}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                            required
                                        >
                                            <option value="">Choose your plan</option>
                                            {plans.map(plan => (
                                                <option key={plan._id} value={plan._id}>
                                                    {plan.name} ({plan.option})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Start Date *
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="date"
                                                name="membershipPlan.startDate"
                                                value={formData.membershipPlan.startDate}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Billing Option *
                                        </label>
                                        <select
                                            name="membershipPlan.option"
                                            value={formData.membershipPlan.option}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200"
                                            required
                                        >
                                            <option value="halfmonth">Half Month</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="quarterly">Quarterly</option>
                                            <option value="halfyear">Half Year</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-200 font-medium transform hover:scale-105"
                                >
                                    Previous
                                </button>
                            )}

                            <div className="ml-auto">
                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!isStepValid()}
                                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 font-medium transform hover:scale-105 disabled:hover:scale-100"
                                    >
                                        Next Step
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={loading || !isStepValid()}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 transform hover:scale-105 disabled:hover:scale-100"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Registering...</span>
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="w-5 h-5" />
                                                <span>Complete Registration</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-gray-500 text-sm">
                    <p>By registering, you agree to our terms and conditions</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-in {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                
                .animate-slide-in {
                    animation: slide-in 0.4s ease-out;
                }
                
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default RegisterMember;
