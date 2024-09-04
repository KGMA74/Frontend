'use client';

import React, { useState } from 'react';
import { api } from '@/utils/api';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

interface AddPostFormProps {
    onPostAdded: () => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onPostAdded }) => {
    const { data : user, error: userRetrieveError, isLoading} = useRetrieveUserQuery(); // pour recuperer les data du user logue
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {    

            await api.post('posts/create/', {
                json: {author: user?.id, category: 'Question', title: title, details: content}
            });
            setTitle('');
            setContent('');
            onPostAdded(); // Recharger les posts après ajout
        } catch (err: any) {
            console.error("Erreur lors de l'ajout du post:", err);
            setError(
                err.response?.data?.message || 
                "Une erreur est survenue lors de l'ajout du post."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Ajouter un Post</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        rows={4}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition`}
                    disabled={loading}
                >
                    {loading ? 'Ajout en cours...' : 'Ajouter le Post'}
                </button>
            </form>
        </div>
    );
};

export default AddPostForm;
