import { User, useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { conversationtype } from "@/utils/type";
import { useEffect, useState, useRef } from "react";
import useWebSockt, {ReadyState} from "react-use-websocket"
import type { messageType } from "@/utils/type";

interface props{
    conversation: conversationtype;
    oldMessages: messageType[];
}

const ConversationDetail: React.FC<props> = ({
    conversation,
    oldMessages
}) => {
    const {data: me } = useRetrieveUserQuery();
    const otherUser = conversation.users?.find((user) => user.id !== me?.id);
    const [newMessage, setnewMessage] = useState('');
    const messageDiv = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<messageType[]>([])

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSockt(
        `ws://127.0.0.1:8000/ws/${conversation.id}/`,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )
    
    useEffect(() => {
        console.log('connection state changed', readyState);
    }, [readyState])
    
    useEffect(() => {
        if(lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: messageType = {
                id: '',
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as User,
                author: me as User,
                conversationId: conversation.id
            }

            setMessages((messages) => [...messages, message])
        }
        scrollToBottom()
    }, [lastJsonMessage, conversation, me, otherUser])

    const sendMessage = async () => {
        console.log('Sending message')
        sendJsonMessage({
            'type': 'chat_message',
            data: {
                body: newMessage,
                name: me?.nickname,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id,
            }
        })
        setnewMessage('');

        setTimeout(() => {
            scrollToBottom()
        }, 50)
    }

    const scrollToBottom = () => {
        if(messageDiv.current){
            messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
        }
    }

    return (

        <>
        <div 
            ref={messageDiv}
            className="max-h-[400px] overflow-auto lex flex-col space-y-4"
        >
            {oldMessages?.map((message, index) => (
                <div 
                    key={index}
                    className={`w-[80%] py-4 px-6 rounded-xl ${message.author.id === me?.id ? 'ml-[20%] bg-blue-200': 'bg-gray-200'}`}>

                    <p className="font-bold text-gray-500">{message.name}</p>
                    <p>{message.body}</p>
                </div>
            ))}

            {messages?.map((message, index) => (
                <div 
                    key={index}
                    className={`w-[80%] py-4 px-6 rounded-xl ${message.name === me?.nickname ? 'ml-[20%] bg-blue-200': 'bg-gray-200'}`}>

                    <p className="font-bold text-gray-500">{message.name}</p>
                    <p>{message.body}</p>
                </div>
            ))}

        </div>

        <div className="">
            <input 
                type="text" 
                placeholder="Type your message..."
                className=""
                value={newMessage}
                onChange={(e) => setnewMessage(e.target.value)}
            />

            <button 
                onClick={sendMessage}
            >
                send
            </button>
        </div>
        </>
    );
}

export default ConversationDetail;