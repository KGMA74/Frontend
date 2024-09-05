"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import Tag from "./Tag";
import { api } from "@/utils/api";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import type { postType, commentType, voteType, tagType } from "@/utils/type";

interface Props {
    post: postType;
}

const Post: React.FC<Props> = ({ post }) => {
    const { data: user, error, isLoading } = useRetrieveUserQuery();
    const [author, setAuthor] = useState({ nickname: "anonymous", email: "" });
    const [userVote, setUserVote] = useState<voteType | null>();
    const [commentsNbr, setCommentsNbr] = useState<number>(0);
    const [tags, setTags] = useState<tagType[]>([]);
    const [voteStatus, setVoteStatus] = useState<string>(""); 
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchAuthor = useCallback(async () => {
        try {
            const authorData = await api.get(`users/${post.author}/`).json<{ nickname: string; email: string }>();
            setAuthor(authorData);
        } catch (error) {
            console.error("Failed to fetch author:", error);
        }
    }, [post.author]);

    const fetchUserVote = useCallback(async () => {
        try {
            const userVoteData = await api.get(`posts/${post.id}/user/${user?.id}/vote/`).json<voteType>();
            setUserVote(userVoteData);
            setVoteStatus(userVoteData.type);
        } catch (error) {
            console.error("Failed to fetch user vote:", error);
        }
    }, [user?.id, post.id]);

    const fetchCommentsNbr = useCallback(async () => {
        try {
            const commentsData = await api.get(`posts/${post.id}/comments_number/`).json<{ totalComments: number }>();
            setCommentsNbr(commentsData.totalComments);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    }, [post.id]);

    const fetchTags = useCallback(async () => {
        try {
            const tagsData = await api.get(`posts/${post.id}/tags/`).json<tagType[]>();
            setTags(tagsData);
        } catch (error) {
            console.error("Failed to fetch tags:", error);
        }
    }, [post.id]);

    const fetchVotes = useCallback(async () => {
        try {
            const { upvotes, downvotes } = await api.get(`posts/${post.id}/votes/all/`).json<{ upvotes: number; downvotes: number }>();
            setUpvotes(upvotes);
            setDownvotes(downvotes);
        } catch (error) {
            console.error("Failed to fetch votes:", error);
        }
    }, [post.id]);

    const handleVote = async (voteType: string) => {
        setLoading(true);
        try {
            if (!userVote) {
                await api.post(`vote/`, { // le user n avait pas voter
                    json: { author: user?.id, post: post.id, type: voteType },
                });
            } else if (userVote.type === voteType) {
                await api.delete(`unvote/${userVote.id}/`);
                setUserVote(null);
                setVoteStatus("");
            } else {
                await api.put(`update-vote/${userVote.id}/`, {
                    json: { ...userVote, type: voteType },
                });
                setVoteStatus(voteType);
            }
            await fetchUserVote();
            await fetchVotes();
        } catch (error) {
            console.error("Failed to handle vote:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAuthor();
        fetchCommentsNbr();
        fetchUserVote();
        fetchTags();
        fetchVotes();
    }, [fetchAuthor, fetchCommentsNbr, fetchUserVote, fetchTags, fetchVotes]);

    return (
        <div className="w-11/12 max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center border-b border-gray-300 bg-gray-100 p-4">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/moi.png"
                        alt="profile"
                        width={40}
                        height={40}
                        priority
                        className="rounded-full"
                    />
                    <span className="ml-2 text-lg font-semibold text-gray-800">{author.nickname}</span>
                </Link>
            </div>
            <div className="p-4">
                <p className="mb-4 text-gray-700">{post.details}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                        <Tag name={tag.name} description={tag.description} key={tag.name} />
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => handleVote("upvote")}
                            className="flex items-center text-green-600 hover:text-green-800 transition-colors mr-4"
                            disabled={loading && voteStatus === 'upvote'}
                        >
                            {loading && voteStatus === 'upvote' ? (
                                <FaSpinner className="animate-spin" size={20} />
                            ) : (
                                <AiOutlineLike size={20} />
                            )}
                            <span className="ml-2">{upvotes}</span>
                        </button>
                        <button
                            onClick={() => handleVote("downvote")}
                            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                            disabled={loading && voteStatus === 'downvote'}
                        >
                            {loading && voteStatus === 'downvote' ? (
                                <FaSpinner className="animate-spin" size={20} />
                            ) : (
                                <AiOutlineDislike size={20} />
                            )}
                            <span className="ml-2">{downvotes}</span>
                        </button>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <span className="mr-2">{commentsNbr}</span>
                        <span>Answers</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
