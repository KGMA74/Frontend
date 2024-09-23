import React, { useEffect, useState } from 'react';
import { messageType, userType, conversationtype } from '@/utils/type';

interface NewMessage extends Omit<messageType, 'id'> {}

interface ConversationDetailProps {
    conversation: conversationtype;
    oldMessages: messageType[];
    currentUser: userType;
    websocket: WebSocket | null;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
    conversation,
    oldMessages,
    currentUser,
    websocket: initialWebsocket
}) => {
    const [messages, setMessages] = useState<messageType[]>(oldMessages);
    const [newMessage, setNewMessage] = useState('');
    const [websocket, setWebsocket] = useState<WebSocket | null>(initialWebsocket);
    const messageQueue: NewMessage[] = [];

    useEffect(() => {
        const wsUrl = `ws://127.0.0.1:8000/ws/${conversation.id}/`;
        const ws = new WebSocket(wsUrl);
        setWebsocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const messageData: messageType = JSON.parse(event.data);
            setMessages((prev) => [...prev, messageData]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, [conversation.id]);

    const sendMessage = () => {
        const messageData: NewMessage = {
            name: currentUser.nickname,
            body: newMessage,
            conversationId: conversation.id,
            sent_to: (conversation.users[0] === currentUser) ? conversation.users[1] : conversation.users[0],
            author: currentUser
        };

        if (websocket) {
            if (websocket.readyState === WebSocket.OPEN) {
                console.log('Sending message:', messageData);
                websocket.send(JSON.stringify(messageData));
                setMessages((prev) => [...prev, { ...messageData, id: 'temp-id' }]);
                setNewMessage('');
            } else {
                messageQueue.push(messageData);
                console.warn('Message queued because WebSocket is not open');
            }
        } else {
            console.error('WebSocket is not initialized');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow overflow-y-auto p-4 ">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <div className="font-semibold">{msg.name}</div>
                        <div className="bg-white rounded-lg p-2 shadow">{msg.body}</div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-white shadow-lg">
                <div className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow border border-gray-300 rounded-lg p-2"
                    />
                    <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white rounded-lg px-4">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConversationDetail;
