"use client";
import { useRouter } from "next/navigation";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice"; // Import de votre query
import AddConversation from "@/components/AddConversation";

const AddConversationPage = () => {
    const router = useRouter();
    
    // Récupération de l'utilisateur connecté via Redux
    const { data: currentUser, isLoading, error } = useRetrieveUserQuery();

    const handleCreateConversation = (conversationId: string) => {
        router.push(`/inbox/${conversationId}`);
    };

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (error || !currentUser) {
        return <p>Erreur lors de la récupération de l'utilisateur ou utilisateur non connecté.</p>;
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Nouvelle Conversation</h1>
            <AddConversation onCreateConversation={handleCreateConversation} currentUser={currentUser} />
        </div>
    );
};

export default AddConversationPage;
