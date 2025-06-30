import React from 'react';

const VerifyEmailPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
        <p className="mt-4 text-gray-600">
          We've sent a verification link to your email address. Please click the link to activate your account.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          (You can close this window.)
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
