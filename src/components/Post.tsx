"use client";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import { Tag2 } from "./Tag";
import { api } from "@/utils/api";
import { type postType } from "@/utils/type";
import { useEffect, useState } from "react";

interface props {
    post: postType;
    body?: string;
    votesNumber?: { upvote: number; downvote: number };
}

interface tagType {
    name: string;
    description: string;
}


const Post: React.FC<props> = ({ post }) => {
    const [owner, setOwner] = useState({nickname: 'anonymous', email: ''});
    const [comments, setComments] = useState()
    const [tags, setTags] = useState<tagType[]>([]);
    const [voteStatus, setVoteStatus] = useState(0) // none vote by default;
    const [upvotes, setUpvotes] = useState(0)
    const [downvotes, setDownvote] = useState(0)

    const getOwner = async () => {
        //error handling [todo]
        const owner = await api.get(`users/${post.owner}`).json<{nickname: string, email: string}>()
        setOwner(owner);
    };

    const getTags = async () => {
        //error handling [to do]
        const tags = await api.get(`posts/${post.id}/tags/`).json<tagType[]>();
        setTags(tags);
    };

    // les nombres de votes
    const getVotes = async () => {
        const {upvotes, downvotes} = await api.get(`posts/${post.id}/votes/-1/`).json<{upvotes: number, downvotes: number}>();
        setUpvotes(upvotes)
        setUpvotes(downvotes)
    };

    //action liker & dislike
    const vote = async (voteType: string) => {
        if(voteStatus===0){ // no vote
            await api.post(`vote/`, {
                json: {owner: post.owner, post: post.id, type: (voteType==="like")?1:2}
            })
            setVoteStatus((voteType==="like")?1:2)
        }
        else if ((voteType==="like" && voteStatus===1) || (voteType==="dislike" && voteStatus===2)){ // we remove the vote
            await api.post(`unvote/{d}`) // d: id du vote
            setVoteStatus(0)
        }

        else {
            await api.put(`unvote/{d}`) // we update the vote
            setVoteStatus((voteType==="like")?2:1)
        }
    }

    

    useEffect(() => {
        getTags();
        getVotes();
    }, []);

    return (
        <div className="w-[850px] h-[400px] bg-transparent backdrop-blur-3xl border border-gray-700/90 rounded-2xl shadow-lg m-2">
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
                    {/*<span>{nickname}</span>*/}
                </Link>
            </div>
            <div className="flex flex-col px-2 h-5/6 py-3 bg-white/10 rounded-b-2xl">
                <div className="px-2">
                    <p>
                       {post.details}
                    </p>

                    <div className="mt-1 flex">
                        {/*les tages*/}
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
                            <small>224545 likes</small>
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
                            <small>224545 unlikes</small>
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

                    <div className="m-2 border py-2 px-3 rounded-3xl text-base">
                        <small className="pr-1">5</small>
                        <small>comments</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
