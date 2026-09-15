import React from 'react';
import { Clock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { logoutAction } from '../../../router/router';

export default function PendingApproval() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAction();
        navigate('/login');
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
            <div className="flex justify-center mb-6">
                <div className="bg-yellow-50 p-4 rounded-full">
                    <Clock className="w-12 h-12 text-yellow-500" />
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Pending</h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
                Your registration is currently under review by our administration team. 
                You will be notified once your clinic has been approved and you can start accepting appointments.
            </p>
            
            <button 
                onClick={handleLogout}
                className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
            </button>
        </div>
    );
}
