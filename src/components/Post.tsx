/*
"use client";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import { Tag2 } from "./Tag";
import { api } from "@/utils/api";
import type { postType, commentType, voteType, tagType } from "@/utils/type";
import { useEffect, useState } from "react";

interface props {
    post: postType;
}




const Post: React.FC<props> = ({ post }) => {
    const userId = 1;
    const [owner, setOwner] = useState({nickname: 'anonymous', email: ''});
    const [userVote, setUserVote] = useState<voteType>();
    const [comments, setComments] = useState<commentType[]>([])
    const [tags, setTags] = useState<tagType[]>([]);
    const [voteStatus, setVoteStatus] = useState(0) // none vote by default;
    const [upvotes, setUpvotes] = useState(0)
    const [downvotes, setDownvotes] = useState(0)

    const getOwner = async () => {
        //error handling [todo]
        const owner = await api.get(`users/${post.owner}`).json<{nickname: string, email: string}>()
        setOwner(owner);
    };

    const getUserVote = async () => {
        try{
            const userVote = await api.get(`posts/${post.id}/user/${userId}/vote/`).json<voteType>();
            console.log("userVote::::",userVote);
            setUserVote(userVote);
        }catch(err){
            console.log("errrr in getUserVote:::", err)
        }
    }

    const getComments = async () => {
        //error handling [todo]
        const comments = await api.get(`posts/${post.id}/comments/`).json<commentType[]>();
        console.log("comments", comments)
        setComments(comments)
    }

    const getTags = async () => {
        //error handling [to do]
        const tags = await api.get(`posts/${post.id}/tags/`).json<tagType[]>();
        setTags(tags);
    };

    // les nombres de votes
    const getVotes = async () => {
        const {upvotes, downvotes} = await api.get(`posts/${post.id}/votes/-1/`).json<{upvotes: number, downvotes: number}>();
        console.log("post", post.id, "upvote:::::", upvotes, "downvote::::::", downvotes)
        setUpvotes(upvotes)
        setDownvotes(downvotes)
    };

    //action liker & dislike
    const vote = async (voteType: string) => {
        if(!userVote){ // l'utilisateur n'avait pas voté donc on le fai voter (liker ou disliker)
            await api.post(`vote/`, {
                json: {owner: post.owner, post: post.id, type: (voteType==="like")?1:2}
            })
            getUserVote();
            setVoteStatus((voteType==="like")?1:2)
        }
        else if ((voteType==="like" && userVote.type===1) || (voteType==="dislike" && userVote.type===2)){ // we remove the vote
            await api.delete(`unvote/${userVote?.id}/`) // d: id du vote
            setUserVote(undefined)
            setVoteStatus(0)
        }

        else {
            await api.put(`update-vote/${userVote.id}/`, {
                json: {...userVote, type: (voteType==="like")?1:2}
            }) // we update the vote
            setVoteStatus((voteType==="like")?1:2)
        }
    }

    

    useEffect(() => {
        getComments();
        getUserVote();
        getTags();
        getVotes();
    }, []);

    return (
        <div className="w-11/12 h-[400px] bg-transparent backdrop-blur-3xl border border-gray-700/90 rounded-2xl shadow-lg m-2">
            <div className="h-1/6 py-4 px-3">
                <Link href={"/"} className="flex items-center">
                    <Image
                        src="/moi.png"
                        alt="profile"
                        width={35}
                        height={35}
                        priority
                        className=" mr-3 p-1 border rounded-full"
                    />
                    <span>{owner.nickname}</span>
                    {/*<span>{nickname}</span>}
                </Link>
            </div>
            <div className="flex flex-col px-2 h-5/6 py-3 bg-white/10 rounded-b-2xl">
                <div className="px-2">
                    <p>
                       {post.details}
                    </p>

                    <div className="mt-1 flex">
                        {/*les tages}
                        {tags.map((tag, index) => (
                            <Tag
                                name={tag.name}
                                description={tag.description}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
                <div className="mt-auto flex justify-between px-2">
                    <div className="flex">
                        <div className="flex flex-col justify-center items-center bg-white/10 mr-2 px-2">
                            <small>{upvotes} likes</small>
                            <button onClick={() => vote("like")}>
                                <Image
                                    src="/moi.png"
                                    alt="like"
                                    width={30}
                                    height={30}
                                    priority
                                    className="mt-1 mr-3 p-1 border rounded-full"
                                />
                            </button>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-white/10 px-2">
                            <small>{downvotes} unlikes</small>
                            <button onClick={() => vote("dislike")}>
                                <Image
                                    src="/moi.png"
                                    alt="unlike"
                                    width={30}
                                    height={30}
                                    priority
                                    className="mt-1 mr-3 p-1 border rounded-full"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="m-2 border py-2 px-3 rounded-3xl text-base cursor-pointer">
                        <small className="pr-1">{comments.length}</small>
                        <small>comments</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;*/
/*
"use client";

import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import { api } from "@/utils/api";
import type { postType, commentType, voteType, tagType } from "@/utils/type";
import { useEffect, useState } from "react";
import Home from "@/app/page";

interface Props {
    post: postType;
}

const Post: React.FC<Props> = ({ post }) => {
    const userId = 1; // Note: This should be dynamically set based on the logged-in user
    const [owner, setOwner] = useState({ nickname: 'anonymous', email: '' });
    const [userVote, setUserVote] = useState<voteType | null>(null);
    const [comments, setComments] = useState<commentType[]>([]);
    const [tags, setTags] = useState<tagType[]>([]);
    const [voteStatus, setVoteStatus] = useState<number>(0);
    const [upvotes, setUpvotes] = useState<number>(0);
    const [downvotes, setDownvotes] = useState<number>(0);

    const fetchData = async () => {
        try {
            const [ownerData, userVoteData, commentsData, tagsData, votesData] = await Promise.all([
                api.get(`users/${post.owner}/`, {headers: {Authorization: `bearer $`}}).json<{ nickname: string, email: string }>(),
                api.get(`posts/${post.id}/user/${userId}/vote/`).json<voteType>(),
                api.get(`posts/${post.id}/comments/`).json<commentType[]>(),
                api.get(`posts/${post.id}/tags/`).json<tagType[]>(),
                api.get(`posts/${post.id}/votes/-1/`).json<{ upvotes: number, downvotes: number }>(),
            ]);

            //setOwner(ownerData);
            setUserVote(userVoteData);
            setComments(commentsData);
            setTags(tagsData);
            setUpvotes(votesData.upvotes);
            setDownvotes(votesData.downvotes);
            setVoteStatus(userVoteData ? userVoteData.type : 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const vote = async (voteType: "like" | "dislike") => {
        try {
            if (!userVote) {
                await api.post(`vote/`, {
                    json: { owner: post.owner, post: post.id, type: voteType === "like" ? 1 : 2 },
                });
            } else if ((voteType === "like" && userVote.type === 1) || (voteType === "dislike" && userVote.type === 2)) {
                await api.delete(`unvote/${userVote.id}/`);
                setUserVote(null);
                setVoteStatus(0);
            } else {
                await api.put(`update-vote/${userVote.id}/`, {
                    json: { ...userVote, type: voteType === "like" ? 1 : 2 },
                });
                setVoteStatus(voteType === "like" ? 1 : 2);
            }
            fetchData();
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-11/12 h-[400px] bg-transparent backdrop-blur-3xl border border-gray-700/90 rounded-2xl shadow-lg m-2">
            <div className="h-1/6 py-4 px-3">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/moi.png"
                        alt="profile"
                        width={35}
                        height={35}
                        priority
                        className="mr-3 p-1 border rounded-full"
                    />
                    <span>{owner.nickname}</span>
                </Link>
            </div>
            <div className="flex flex-col px-2 h-5/6 py-3 bg-white/10 rounded-b-2xl">
                <div className="px-2">
                    <p>{post.details}</p>
                    <div className="mt-1 flex">
                        {tags.map((tag, index) => (
                            <Tag name={tag.name} description={tag.description} key={index} />
                        ))}
                    </div>
                </div>
                <div className="mt-auto flex justify-between px-2">
                    <div className="flex">
                        <div className="flex flex-col justify-center items-center bg-white/10 mr-2 px-2">
                            <small>{upvotes} likes</small>
                            <button onClick={() => vote("like")}>
                                <Image
                                    src="/moi.png"
                                    alt="like"
                                    width={30}
                                    height={30}
                                    priority
                                    className="mt-1 mr-3 p-1 border rounded-full"
                                />
                            </button>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-white/10 px-2">
                            <small>{downvotes} unlikes</small>
                            <button onClick={() => vote("dislike")}>
                                <Image
                                    src="/moi.png"
                                    alt="unlike"
                                    width={30}
                                    height={30}
                                    priority
                                    className="mt-1 mr-3 p-1 border rounded-full"
                                />
                            </button>
                        </div>
                    </div>
                    
                    <div className="m-2 border py-2 px-3 rounded-3xl text-base cursor-pointer">
                        <small className="pr-1">{comments.length}</small>
                        <small>comments</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
*/
"use client";

import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import { api } from "@/utils/api";
import type { postType, commentType, voteType, tagType } from "@/utils/type";
import { useEffect, useState, useCallback } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

interface Props {
    post: postType;
}

const Post: React.FC<Props> = ({ post }) => {
    const retrieveUser = useRetrieveUserQuery();
    const userId = 1; // Vous pourriez vouloir obtenir ceci dynamiquement
    const [user, setUser] = useState({id: -2, nickname: "anonuser", email: ""})
    const [owner, setOwner] = useState({ nickname: "anonymous", email: "" });
    const [userVote, setUserVote] = useState<voteType>();
    const [comments, setComments] = useState<commentType[]>([]);
    const [tags, setTags] = useState<tagType[]>([]);
    const [voteStatus, setVoteStatus] = useState(0); // none vote by default
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchUser = useCallback(async () => {
        retrieveUser(unknown)
            .unwrap()
            .then((res) => setUser(res))
    }, [user.id])

    const fetchOwner = useCallback(async () => {
        try {
            const ownerData = await api.get(`users/${post.owner}/`).json<{ nickname: string; email: string }>();
            setOwner(ownerData);
        } catch (error) {
            console.error("Failed to fetch owner:", error);
        }
    }, [post.owner]);

    const fetchUserVote = useCallback(async () => {
        try {
            const userVoteData = await api.get(`posts/${post.id}/user/${userId}/vote/`).json<voteType>();
            setUserVote(userVoteData);
            setVoteStatus(userVoteData.type);
        } catch (error) {
            console.error("Failed to fetch user vote:", error);
        }
    }, [post.id, userId]);

    const fetchComments = useCallback(async () => {
        try {
            const commentsData = await api.get(`posts/${post.id}/comments/`).json<commentType[]>();
            setComments(commentsData);
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
            const { upvotes, downvotes } = await api.get(`posts/${post.id}/votes/-1/`).json<{ upvotes: number; downvotes: number }>();
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
                await api.post(`vote/`, {
                    json: { owner: post.owner, post: post.id, type: voteType === "like" ? 1 : 2 },
                });
            } else if ((voteType === "like" && userVote.type === 1) || (voteType === "dislike" && userVote.type === 2)) {
                await api.delete(`unvote/${userVote.id}/`);
                setUserVote(undefined);
                setVoteStatus(0);
            } else {
                await api.put(`update-vote/${userVote.id}/`, {
                    json: { ...userVote, type: voteType === "like" ? 1 : 2 },
                });
                setVoteStatus(voteType === "like" ? 1 : 2);
            }
            fetchUserVote();
            fetchVotes();
        } catch (error) {
            console.error("Failed to handle vote:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOwner();
        fetchComments();
        fetchUserVote();
        fetchTags();
        fetchVotes();
    }, [fetchOwner, fetchComments, fetchUserVote, fetchTags, fetchVotes]);

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
                    <span className="ml-2 font-semibold">{owner.nickname}</span>
                </Link>
            </div>
            <div className="flex flex-col h-5/6">
                <div className="flex-grow">
                    <p className="mb-4">{post.details}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <Tag name={tag.name} description={tag.description} key={index} />
                        ))}
                    </div>
                </div>
                <div className="mt-auto flex justify-between items-center">
                    <div className="flex">
                        <button
                            onClick={() => handleVote("like")}
                            className="flex items-center bg-green-600 hover:bg-green-700 rounded-full p-2 transition-colors"
                            disabled={loading}
                        >
                            {loading && voteStatus === 1 ? (
                                <FaSpinner className="animate-spin" size={20} />
                            ) : (
                                <AiOutlineLike size={20} />
                            )}
                            <span className="ml-2">{upvotes}</span>
                        </button>
                        <button
                            onClick={() => handleVote("dislike")}
                            className="flex items-center bg-red-600 hover:bg-red-700 rounded-full p-2 ml-2 transition-colors"
                            disabled={loading}
                        >
                            {loading && voteStatus === 2 ? (
                                <FaSpinner className="animate-spin" size={20} />
                            ) : (
                                <AiOutlineDislike size={20} />
                            )}
                            <span className="ml-2">{downvotes}</span>
                        </button>
                    </div>
                    <div className="flex items-center bg-gray-700 p-2 rounded-full">
                        <span className="mr-2">{comments.length}</span>
                        <span>comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div className="w-11/12 h-[400px] bg-transparent backdrop-blur-3xl border border-gray-700/90 rounded-2xl shadow-lg m-2">
            <div className="h-1/6 py-4 px-3">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/moi.png"
                        alt="profile"
                        width={35}
                        height={35}
                        priority
                        className="mr-3 p-1 border rounded-full"
                    />
                    <span>{owner.nickname}</span>
                </Link>
            </div>
            <div className="flex flex-col px-2 h-5/6 py-3 bg-white/10 rounded-b-2xl">
                <div className="px-2">
                    <p>{post.details}</p>
                    <div className="mt-1 flex">
                        {tags.map((tag, index) => (
                            <Tag name={tag.name} description={tag.description} key={index} />
                        ))}
                    </div>
                </div>
                <div className="mt-auto flex justify-between px-2">
                    <div className="flex">
                        <div className="flex flex-col justify-center items-center bg-white/10 mr-2 px-2">
                            <small>{upvotes} likes</small>
                            <button onClick={() => handleVote("like")}>
                                <Image
                                    src="/moi.png"
                                    alt="like"
                                    width={30}
                                    height={30}
                                    priority
                                    className="mt-1 mr-3 p-1 border rounded-full"
                                />
                            </button>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-white/10 px-2">
                            <small>{downvotes} unlikes</small>
                            <button onClick={() => handleVote("dislike")}>
                                <Image
                                    src="/moi.png"
                                    alt="unlike"
                                    width={30}
                                    height={30}
                                    priority
                                    className="mt-1 mr-3 p-1 border rounded-full"
                                />
                            </button>
                        </div>
                    </div>
                    
                    <div className="m-2 border py-2 px-3 rounded-3xl text-base cursor-pointer">
                        <small className="pr-1">{comments.length}</small>
                        <small>comments</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
