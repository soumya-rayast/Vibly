import React from 'react';
import { LANGUAGE_TO_FLAG } from '../constants';
import { Link } from 'react-router-dom';

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-100 border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl">
      <div className="card-body p-5 space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={friend.profilePic} alt={friend.fullName} />
            </div>
          </div>
          <h3 className="font-semibold text-lg text-primary truncate">{friend.fullName}</h3>
        </div>

        {/* Language Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-secondary text-xs px-3 py-1">
            {getLanguageFlag(friend.nativeLanguage)} Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs px-3 py-1">
            {getLanguageFlag(friend.learningLanguage)} Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* Message Button */}
        <Link to={`/chat/${friend._id}`} className="btn btn-primary btn-sm w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
