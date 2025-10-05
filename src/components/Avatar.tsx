import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
    gender?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
    gender = 'male',
    size = 'md',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-16 h-16 text-lg'
    };

    const getMaleAvatar = () => (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg ring-2 ring-green-400/30 ${className}`}>
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                {/* Background Circle - Green */}
                <circle cx="50" cy="50" r="50" fill="#22C55E" />

                {/* Head Silhouette */}
                <circle cx="50" cy="35" r="18" fill="white" />

                {/* Shoulders/Body */}
                <ellipse cx="50" cy="85" rx="35" ry="25" fill="white" />

                {/* Cut out bottom to create silhouette effect */}
                <circle cx="50" cy="50" r="49" fill="none" stroke="#22C55E" strokeWidth="2" />
            </svg>
        </div>
    );

    const getFemaleAvatar = () => (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg ring-2 ring-cyan-400/30 ${className}`}>
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                {/* Background Circle - Cyan/Teal */}
                <circle cx="50" cy="50" r="50" fill="#06B6D4" />

                {/* Head Silhouette - slightly smaller for feminine look */}
                <circle cx="50" cy="35" r="16" fill="white" />

                {/* Hair/longer silhouette sides */}
                <ellipse cx="35" cy="40" rx="8" ry="15" fill="white" />
                <ellipse cx="65" cy="40" rx="8" ry="15" fill="white" />

                {/* Shoulders/Body - slightly narrower */}
                <ellipse cx="50" cy="85" rx="32" ry="25" fill="white" />

                {/* Cut out bottom to create silhouette effect */}
                <circle cx="50" cy="50" r="49" fill="none" stroke="#06B6D4" strokeWidth="2" />
            </svg>
        </div>
    );

    const getDefaultAvatar = () => (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-gray-500 via-white to-gray-600 flex items-center justify-center ${className}`}>
            <User className="w-1/2 h-1/2 text-gray-600" />
        </div>
    );

    if (gender === 'male') {
        return getMaleAvatar();
    } else if (gender === 'female') {
        return getFemaleAvatar();
    } else {
        return getDefaultAvatar();
    }
};