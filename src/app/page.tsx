'use client';
import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import type { postType, commentType } from "@/utils/type";

const Home = () => {
    const [posts, setPosts] = useState<postType[]>([]);

    const getPost = async () => {
        //error handling
        const posts = await api.get("posts/").json<postType[]>();
        setPosts(posts);
    };

    useEffect(() => {
      getPost()
    }, []);

    return (
        <main className="w-full h-full grid grid-cols-6 gap-x-2 mt-2 py-5">
            <div className="Subject col-span-1">
                <hr></hr>
                subject
            </div>
            <div className="Content col-span-4 overflow-y-scroll scroll-smooth">
                <div className="flex flex-col justify-center items-center">
                    {posts.map((post, index) => (
                      <Post post={post} key={index}/>
                    ))}
                </div>
            </div>
            <div className="Activity col-span-1">
                <hr />
                Activity
            </div>
        </main>
    );
};

export default Home;
