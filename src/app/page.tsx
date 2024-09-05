"use client";

import React, { useState, useEffect } from "react";
import Post from "@/components/Post";
import AskQuestion from "@/components/AskQuestion";
import AddPostForm from "@/components/AddPostForm";
import { api } from "@/utils/api";
import type { postType } from "@/utils/type";
import RequireAuth from "@/components/utils/RequireAuth";

const Home = () => {
  const [posts, setPosts] = useState<postType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddPostForm, setShowAddPostForm] = useState<boolean>(false);

  const getPost = async () => {
    setLoading(true);
    setError(null);
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
    getPost(); // Recharger les posts après l'ajout
    setShowAddPostForm(false); // Revenir à AskQuestion après l'ajout
  };

  const handleClickAskQuestion = () => {
    setShowAddPostForm(true); // Afficher AddPostForm
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-red-500 text-lg">Erreur : {error}</p>
        <button
          onClick={getPost}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <RequireAuth>
      <main className="w-full h-full grid grid-cols-6 gap-x-2 mt-2 py-5 bg-gray-100 text-gray-800">
        <div className="Subject col-span-1 p-4 bg-gray-100 rounded shadow-md border border-r-slate-400">
          <ul className="space-y-2">
            <li>
              <button
                className="hover:bg-slate-200 group border border-r-slate-400 flex items-center rounded-md bg-slate-100 text-black text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                HOME
              </button>
            </li>
            <li>
              <button
                className="hover:bg-slate-200 group border border-r-slate-400 flex items-center rounded-md bg-slate-100 text-black text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
                type="button"
              >
                
                HOME
              </button>
            </li>
            <li>
              <button
                className="hover:bg-slate-200 group border border-r-slate-400 flex items-center rounded-md bg-slate-100 text-black text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
                type="button"
              >
                
                HOME
              </button>
            </li>
            {/* Vous pouvez ajouter plus de sujets */}
          </ul>
        </div>

        <div className="Content col-span-4 overflow-y-scroll scroll-smooth">
          <div className="flex flex-col justify-center items-center space-y-4">
            {showAddPostForm ? (
              <AddPostForm onPostAdded={handlePostAdded} />
            ) : (
              <AskQuestion onClick={handleClickAskQuestion} />
            )}

            {posts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </div>
        </div>

        <div className="Activity col-span-1 p-4 bg-gray-100 rounded shadow-md border border-l-slate-400">
          <h3 className="font-semibold text-lg mb-2">Activité</h3>
          <p>Dernières actions</p>
          {/* Ajoutez plus d'informations sur l'activité */}
        </div>
      </main>
    </RequireAuth>
  );
};

export default Home;
