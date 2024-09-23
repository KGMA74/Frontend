"use client";
import { conversationtype } from "@/utils/type";
import Conversation from "@/components/Conversation";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import ConversationButtun from "@/components/ConversationButtun";
import Link from "next/link";


const InboxPage = () => {
  const { data: user } = useRetrieveUserQuery();
  const [conversations, setConversations] = useState<conversationtype[]>([]);
  const [showAddConversation, setShowAddConversation] = useState<boolean>(false);

  const getConversations = async () => {
    const resp = await api.get("chat/").json<conversationtype[]>();
    setConversations(resp);
  };

  useEffect(() => {
    getConversations();
  }, []);

  const handleConversationAdded = () => {
    getConversations(); // Recharger les conversations après l'ajout
    setShowAddConversation(false); // Fermer le formulaire d'ajout
  };

  const handleClickConversationButton = () => {
    setShowAddConversation(true);
  };

  if (!user) {
    return <p>Vous devez être authentifié pour voir cette page.</p>;
  }

  return (
    <div className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
      <h1 className="my-6 text-2xl">Inbox</h1>
      <Link
        href="/addconversation"
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        {!showAddConversation && (
          <ConversationButtun onClick={handleClickConversationButton} />
        )}
      </Link>
      
      {conversations?.map((conversation) => (
        <Conversation
          key={conversation.id}
          userId={user.id}
          conversation={conversation}
        />
      ))}
    </div>
  );
};

export default InboxPage;
