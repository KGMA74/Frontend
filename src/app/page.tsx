'use client';

import Post from "@/components/Post";
import AddPostForm from "@/components/AddPostForm";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import type { postType } from "@/utils/type";
import RequireAuth from "@/components/utils/RequireAuth";

const Home = () => {
    const [posts, setPosts] = useState<postType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getPost = async () => {
        setLoading(true);  // Remettre le statut de chargement à true
        setError(null);    // Réinitialiser les erreurs
        try {
            const posts = await api.get("posts/").json<postType[]>();
            setPosts(posts);
        } catch (err) {
            setError("Une erreur est survenue lors de la récupération des posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    const handlePostAdded = () => {
        getPost();  // Recharger les posts après ajout
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Erreur : {error}</p>
                <button onClick={getPost} className="bg-blue-500 text-white p-2 rounded">
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <RequireAuth>
            <main className="w-full h-full grid grid-cols-6 gap-x-2 mt-2 py-5">
                <div className="Subject col-span-1">
                    <hr />
                    <p>Subject</p>
                </div>
                <div className="Content col-span-4 overflow-y-scroll scroll-smooth">
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <AddPostForm onPostAdded={handlePostAdded} />
                        {posts.map((post, index) => (
                            <Post post={post} key={index} />
                        ))}
                    </div>
                </div>
                <div className="Activity col-span-1">
                    <hr />
                    <p>Activity</p>
                </div>
            </main>
        </RequireAuth>
    );
};

export default Home;
