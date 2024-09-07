// utils/database.ts
export async function getPostById(postId: string) {
  const response = await fetch(`api/posts/${postId}`);
  if (!response.ok) {
      throw new Error('Erreur lors de la récupération du post');
  }
  return response.json();
}

export async function getPostVotes(postId: string) {
  const response = await fetch(`api/posts/${postId}/votes/all/`);
  if (!response.ok) {
      throw new Error('Erreur lors de la récupération des votes');
  }
  return response.json();
}

export async function getCommentsByPost(postId: string) {
  const response = await fetch(`api/posts/${postId}/comments/`);
  if (!response.ok) {
      throw new Error('Erreur lors de la récupération des commentaires');
  }
  return response.json();
}

export async function getTagsByPost(postId: string) {
  const response = await fetch(`api/posts/${postId}/tags/`);
  if (!response.ok) {
      throw new Error('Erreur lors de la récupération des tags');
  }
  return response.json();
}
