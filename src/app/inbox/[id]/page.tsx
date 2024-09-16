'use client';

import ConversationDetail from "@/components/ConversationDetail";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import type { conversationtype } from "@/utils/type";
import { api } from "@/utils/api";
import { useState, useEffect, useCallback } from "react";
import type { messageType } from "@/utils/type";

const ConversationPage = ({ params }: { params: {id: string }}) => {
    const { data: user } = useRetrieveUserQuery();
    const [conversation, setConversation] = useState<conversationtype>()
    const [oldMessages, setOldMessages] = useState<messageType[]>([])

    const getConversation = useCallback(async () => {
        const resp = await api.get(`chat/${params.id}/`).json<{conversation: conversationtype, messages: messageType[]}>();
        setConversation(resp.conversation);
        setOldMessages(resp.messages);
    }, [params.id]);

    useEffect(() => {    
        getConversation();
    }, [getConversation])

    if(!user){
        return (
            <p>doit etre authentifier</p>
        );
    }

    if(!conversation) return null;

    return (
        <main className=''>
            <ConversationDetail
                conversation={conversation}
                oldMessages={oldMessages}
            />
        </main>
    )
}

export default ConversationPage;