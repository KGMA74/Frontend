// app/posts/[postId]/page.tsx

"use client"; // Indique que ce fichier est un composant client

import React from 'react';
import { useParams } from 'next/navigation';
import { getPostById, getPostVotes, getCommentsByPost, getTagsByPost } from '@/utils/databases';

const PostPage: React.FC = () => {
    const { postId } = useParams();
    const [post, setPost] = React.useState<any>(null);
    const [votes, setVotes] = React.useState<any>(null);
    const [comments, setComments] = React.useState<any[]>([]);
    const [tags, setTags] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    // Assurez-vous que postId est une chaîne
    const postIdString = Array.isArray(postId) ? postId[0] : postId;

    React.useEffect(() => {
        async function loadPost() {
            try {
                if (!postIdString) {
                    throw new Error('ID de post manquant');
                }

                const postDetails = await getPostById(postIdString);
                const votesDetails = await getPostVotes(postIdString);
                const commentsDetails = await getCommentsByPost(postIdString);
                const tagsDetails = await getTagsByPost(postIdString);

                setPost(postDetails);
                setVotes(votesDetails);
                setComments(commentsDetails);
                setTags(tagsDetails);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                setError('Une erreur est survenue lors de la récupération des données.');
            }
        }

        if (postIdString) {
            loadPost();
        }
    }, [postIdString]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.details}</p>
            <div>
                <h2>Votes</h2>
                <p>Upvotes: {votes?.upvotes}</p>
                <p>Downvotes: {votes?.downvotes}</p>
            </div>
            <div>
                <h2>Commentaires</h2>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id}>
                            <h3>{comment.title}</h3>
                            <p>{comment.details}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucun commentaire</p>
                )}
            </div>
            <div>
                <h2>Tags</h2>
                {tags.length > 0 ? (
                    tags.map(tag => <span key={tag.id}>{tag.name}</span>)
                ) : (
                    <p>Aucun tag</p>
                )}
            </div>
        </div>
    );
};

export default PostPage;
