"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import type { postType } from '@/utils/type';
import Comment from '@/components/Comment';

interface PostPageProps {
  params: {
    id: string;
  };
}

const PostPage: React.FC<PostPageProps> = ({ params }) => {
  const [post, setPost] = useState<postType | null>(null);
  const [comments, setComments] = useState<Array<postType>>([]); // Remplacez `postType` par le type correct pour les commentaires
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const postId = parseInt(params.id);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        const postData = await api.get(`posts/${postId}`).json<postType>();
        setPost(postData);

        // Assurez-vous d'utiliser le type correct pour les commentaires
        const commentsData = await api
          .get(`posts/${postId}/comments/`)
          .json<Array<postType>>(); // Remplacez `postType` par le type correct pour les commentaires
        setComments(commentsData);
      } catch (error) {
        console.error("Failed to fetch post or comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 my-6">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-50 border-b border-gray-200">
        <div
          className={`w-[50px] h-[50px] rounded-full overflow-hidden border ${
            post.author.confirmed ? "border-blue-500" : ""
          }`}
        >
          <img
            src={post.author.photo || `/moi.png`}
            alt="profile"
            width={50}
            height={50}
            className="object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-bold text-gray-800">
            {post.author.user.nickname}
          </p>
          <p className="text-xs text-gray-500">
            Posté le {new Date(post.created).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          {post.title}
        </h1>
        <p className="text-gray-700 mb-4">{post.details}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag.name}
              className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* Comments */}
        <div className="mt-6">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
