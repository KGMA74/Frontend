"use client";
import { conversationtype } from "@/utils/type";
import Conversation from "@/components/Conversation";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import ConversationButtun from "@/components/ConversationButtun";
import RequireAuth from "@/components/utils/RequireAuth";
import Link from "next/link";

const InboxPage = () => {
    const [conversations, setConversations] = useState<conversationtype[]>([]);
    const [showAddConversation, setShowAddConversation] =
        useState<boolean>(false);

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

    return (
        <RequireAuth>
            <div className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
                <h1 className="my-6 text-2xl">Inbox</h1>
                <Link
                    href="/addconversation"
                    className="flex items-center text-gray-600 hover:text-blue-600"
                >
                    {!showAddConversation && (
                        <ConversationButtun
                            onClick={handleClickConversationButton}
                        />
                    )}
                </Link>

                {conversations?.map((conversation) => (
                    <Conversation
                        key={conversation.id}
                        conversation={conversation}
                    />
                ))}
            </div>
        </RequireAuth>
    );
};

export default InboxPage;
