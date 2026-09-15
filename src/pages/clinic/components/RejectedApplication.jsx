import React from 'react';
import { AlertTriangle, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { logoutAction } from '../../../router/router';

export default function RejectedApplication({ rejectionReason }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAction();
        navigate('/login');
    };

    const handleEditProfile = () => {
        navigate('/clinic/resubmit');
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-center mb-6">
                <div className="bg-red-50 p-4 rounded-full">
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Registration Rejected</h2>
            
            <p className="text-gray-600 mb-6 text-center leading-relaxed">
                Unfortunately, your clinic registration could not be approved at this time. 
                Please review the reason below and update your information.
            </p>
            
            {rejectionReason && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-md">
                    <h3 className="text-sm font-medium text-red-800 mb-1">Reason for Rejection:</h3>
                    <p className="text-sm text-red-700 whitespace-pre-wrap">{rejectionReason}</p>
                </div>
            )}
            
            <div className="flex flex-col space-y-3">
                <button 
                    onClick={handleEditProfile}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Settings className="w-4 h-4 mr-2" />
                    Modify Registration Info
                </button>
                
                <button 
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                </button>
            </div>
        </div>
    );
}
