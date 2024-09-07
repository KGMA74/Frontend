// app/api/posts/[postId]/route.ts
import { NextResponse } from 'next/server';
import { getPostById, getPostVotes, getCommentsByPost, getTagsByPost } from '@/utils/databases';

export async function GET(request: Request, { params }: { params: { postId: string } }) {
    const { postId } = params;

    try {
        const post = await getPostById(postId);
        const votes = await getPostVotes(postId);
        const comments = await getCommentsByPost(postId);
        const tags = await getTagsByPost(postId);

        return NextResponse.json({
            post,
            votes,
            comments,
            tags
        });
    } catch (error) {
        return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 });
    }
}
