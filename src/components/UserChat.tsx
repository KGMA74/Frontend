import React from 'react';
import type { ProfileType } from "@/utils/type";

interface UserChatProps {
    profile: ProfileType;
    onClick: () => void; // Ajout de la prop onClick
}

const UserChat: React.FC<UserChatProps> = ({ profile, onClick }) => {
    return (
        <div onClick={onClick} className="cursor-pointer p-2 hover:bg-gray-200">
            <img src={profile.photo || './moi.png'} alt={profile.bio || ''} className="w-8 h-8 rounded-full" />
            <span>{profile.user.nickname}</span>
        </div>
    );
};

export default UserChat;
