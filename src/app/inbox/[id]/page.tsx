'use client';

import ConversationDetail from "@/components/ConversationDetail";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import type { conversationtype, messageType } from "@/utils/type";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const ConversationPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { data: user } = useRetrieveUserQuery();
    const [conversation, setConversation] = useState<conversationtype>();
    const [oldMessages, setOldMessages] = useState<messageType[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    // Fonction pour récupérer la conversation
    const getConversation = async () => {
        const resp = await api.get(`chat/${params.id}/`).json<{ conversation: conversationtype, messages: messageType[] }>();
        setConversation(resp.conversation);
        setOldMessages(resp.messages);
    };

    // Gestion des effets pour établir la connexion WebSocket
    useEffect(() => {
        const websocket = new WebSocket(`ws://127.0.0.1:8000/ws/${params.id}/`); // Chemin mis à jour

        websocket.onopen = () => {
            console.log("WebSocket connection established");
            websocket.send(JSON.stringify({ action: "join", conversationId: params.id }));
        };

        websocket.onmessage = (event) => {
            const message: messageType = JSON.parse(event.data);
            setOldMessages(prevMessages => [...prevMessages, message]);
        };

        websocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        websocket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        setWs(websocket);

        // Nettoyage lors du démontage du composant
        return () => {
            websocket.close();
        };
    }, [params.id]);

    // Appel initial pour récupérer la conversation
    useEffect(() => {
        getConversation();
    }, []);

    // Vérification de l'authentification de l'utilisateur
    if (!user) {
        return (
            <div className="text-center mt-10">
                <p className="text-lg">Vous devez être authentifié</p>
            </div>
        );
    }

    // Attente de la récupération de la conversation
    if (!conversation) return null;

    // Rendu du composant
    return (
        <div className="flex flex-col h-screen bg-white">
            <header className="bg-white p-4 shadow">
                <h1 className="text-xl font-bold">Conversation avec {(conversation.users[0]===user)?conversation.users[1].nickname:conversation.users[0].nickname}</h1>
                <button 
                    onClick={async () => {
                        if (confirm("Êtes-vous sûr de vouloir supprimer cette conversation ?")) {
                            await api.delete(`chat/${params.id}/delete/`);
                            router.push('/inbox');
                        }
                    }} 
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition mt-2"
                >
                    Supprimer la conversation
                </button>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                <ConversationDetail
                    conversation={conversation}
                    oldMessages={oldMessages}
                    currentUser={user}
                    websocket={ws}
                />
            </main>
        </div>
    );
}

export default ConversationPage;
