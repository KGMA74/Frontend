
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const useComment = () => {
    const router = useRouter();
    const [comment, { isLoading }] = useCommentMutation();

    const commentSubmit = async (event: FormEvent<HTMLFormElement>, uid: number, postId: number) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const content = form["content"].value;

        comment({uid, postId, content})
            .unwrap()
            .then(() => {
                //toast.success("Commment sent successfully");
                router.refresh()
            })
            .catch(() => {
                toast.error("Comment not sent");
            });
    };
    
    const isLoadingCommentSent = isLoading;
    return {
        commentSubmit,
        isLoadingCommentSent,
    };
};


export default useComment;