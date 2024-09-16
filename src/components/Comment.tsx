// Comment.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CommentProps {
    comment: {
        id: number;
        author: {
            id: number;
            photo: string;
            nickname: string;
        };
        content: string;
        created: string;
    };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div className="flex items-start bg-gray-50 p-4 rounded-md border border-gray-200 my-2">
            <div className="w-[40px] h-[40px] flex rounded-full overflow-hidden mr-3">
                <Image
                    src={comment.author.photo || '/moi.png'}
                    alt="profile"
                    width={40}
                    height={40}
                    className="object-cover"
                />
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-800">{comment.author.nickname}</p>
                <p className="text-sm text-gray-600">{comment.content}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(comment.created).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default Comment;
