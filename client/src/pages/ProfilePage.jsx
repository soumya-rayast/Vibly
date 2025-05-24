import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '../lib/api';
import PageLoader from '../Components/PageLoader';
import { getLanguageFlag } from '../Components/FriendCard'; // reuse if applicable

const ProfilePage = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getAuthUser,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <PageLoader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        User not found.
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      <div className="card bg-base-100 shadow-md p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.profilePic} alt={user.fullName} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {user.bio && (
          <div>
            <h3 className="font-semibold text-lg">Bio</h3>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-secondary text-sm">
            {getLanguageFlag(user.nativeLanguage)} Native: {user.nativeLanguage}
          </span>
          <span className="badge badge-outline text-sm">
            {getLanguageFlag(user.learningLanguage)} Learning: {user.learningLanguage}
          </span>
        </div>

        {user.location && (
          <div className="text-sm text-gray-600">
            📍 Location: {user.location}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
