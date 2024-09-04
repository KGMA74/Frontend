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
    const [author, setauthor] = useState({ nickname: "anonymous", email: "" });
    const [userVote, setUserVote] = useState<voteType>();
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
    }, [post.id]);

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
        <div className="w-11/12 h-[400px] bg-gray-800 border border-gray-700/90 rounded-2xl shadow-lg m-2 p-4 text-white">
            <div className="h-1/6 py-4 px-3 flex items-center">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/moi.png"
                        alt="profile"
                        width={40}
                        height={40}
                        priority
                        className="rounded-full"
                    />
                    <span className="ml-2 font-semibold">{author.nickname}</span>
                </Link>
            </div>
            <div className="flex flex-col h-5/6">
                <div className="flex-grow">
                    <p className="mb-4">{post.details}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Tag name={tag.name} description={tag.description} key={tag.name} />
                        ))}
                    </div>
                </div>
                <div className="mt-auto flex justify-between items-center">
                    <div className="flex">
                        <button
                            onClick={() => handleVote("upvote")}
                            className="flex items-center bg-green-600 hover:bg-green-700 rounded-full p-2 transition-colors"
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
                            className="flex items-center bg-red-600 hover:bg-red-700 rounded-full p-2 ml-2 transition-colors"
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
                    <div className="flex items-center bg-gray-700 p-2 rounded-full">
                        <span className="mr-2">{commentsNbr}</span>
                        <span>comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
