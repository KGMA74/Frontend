import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import Tag from "./Tag";
import { api } from "@/utils/api";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import type { postType, voteType, tagType } from "@/utils/type";

// Définition des types pour les réponses de l'API
interface AuthorType {
  nickname: string;
  email: string;
}

interface VotesResponse {
  upvotes: number;
  downvotes: number;
}

interface CommentsNumberResponse {
  totalComments: number;
}

interface Props {
  post: postType;
}

const Post: React.FC<Props> = ({ post }) => {
  const { data: user } = useRetrieveUserQuery();
  const [author, setAuthor] = useState<AuthorType>({ nickname: "anonymous", email: "" });
  const [tags, setTags] = useState<tagType[]>([]);
  const [userVote, setUserVote] = useState<voteType | null>(null);
  const [voteStatus, setVoteStatus] = useState<string>("");
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [commentsNbr, setCommentsNbr] = useState<number>(0);

  // Fetch author
  const fetchAuthor = useCallback(async () => {
    try {
      const authorData = await api.get(`users/${post.author}/`).json<AuthorType>();
      setAuthor(authorData);
    } catch (error) {
      console.error("Failed to fetch author:", error);
    }
  }, [post.author]);

  // Fetch votes
  const fetchVotes = useCallback(async () => {
    try {
      const { upvotes, downvotes } = await api.get(`posts/${post.id}/votes/all/`).json<VotesResponse>();
      setUpvotes(upvotes);
      setDownvotes(downvotes);
    } catch (error) {
      console.error("Failed to fetch votes:", error);
    }
  }, [post.id]);

  // Fetch comments number
  const fetchCommentsNbr = useCallback(async () => {
    try {
      const commentsData = await api.get(`posts/${post.id}/comments_number/`).json<CommentsNumberResponse>();
      setCommentsNbr(commentsData.totalComments);
    } catch (error) {
      console.error("Failed to fetch comments number:", error);
    }
  }, [post.id]);

  useEffect(() => {
    fetchAuthor();
    fetchVotes();
    fetchCommentsNbr();
  }, [fetchAuthor, fetchVotes, fetchCommentsNbr]);

  const handleVote = async (voteType: string) => {
    setLoading(true);
    try {
      if (!userVote) {
        await api.post(`vote/`, {
          json: { author: post.author, post: post.id, type: voteType },
        });
      } else {
        await api.put(`update-vote/${userVote.id}/`, { json: { type: voteType } });
        setVoteStatus(voteType);
      }
      await fetchVotes();
    } catch (error) {
      console.error("Failed to vote:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 my-6">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-50">
        <Link href="/" className="flex items-center">
          <Image
            src="/moi.png"
            alt="profile"
            width={48}
            height={48}
            priority
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-800">{author.nickname}</p>
            <p className="text-xs text-gray-500">Posted on {new Date(post.created).toLocaleDateString()}</p>
          </div>
        </Link>
      </div>

      {/* Post Content */}
      <div className="p-6">
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          {post.details}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-6">
          {tags.map(tag => (
            <Tag key={tag.name} name={tag.name} description={tag.description} />
          ))}
        </div>

        {/* Reactions and Comments */}
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <div className="flex items-center space-x-5">
            <button
              onClick={() => handleVote("upvote")}
              className={`flex items-center text-blue-600 hover:text-blue-800 transition-colors ${
                voteStatus === "upvote" && "text-blue-800"
              }`}
            >
              {loading && voteStatus === "upvote" ? (
                <FaSpinner className="animate-spin" size={20} />
              ) : (
                <AiOutlineLike size={20} />
              )}
              <span className="ml-2 text-base">{upvotes}</span>
            </button>
            <button
              onClick={() => handleVote("downvote")}
              className={`flex items-center text-red-600 hover:text-red-800 transition-colors ${
                voteStatus === "downvote" && "text-red-800"
              }`}
            >
              {loading && voteStatus === "downvote" ? (
                <FaSpinner className="animate-spin" size={20} />
              ) : (
                <AiOutlineDislike size={20} />
              )}
              <span className="ml-2 text-base">{downvotes}</span>
            </button>
          </div>

          <div className="flex items-center text-gray-600">
            <FaRegComment size={20} />
            <span className="ml-2 text-base">{commentsNbr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
