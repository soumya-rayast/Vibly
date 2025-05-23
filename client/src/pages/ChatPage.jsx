import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';
import { StreamChat } from "stream-chat"
import toast from 'react-hot-toast';
import ChatLoader from '../Components/ChatLoader';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CallButton from '../Components/CallButton';
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ['streamToken'],
    queryFn: getStreamToken,
    enabled: !!authUser,
  })
  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;
      if (authUser._id === targetUserId) {
        toast.error("Cannot create a chat with yourself");
        setLoading(false);
        return;
      }
      try {
        console.log('Initializing stream chat client...');
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }, tokenData.token);

        const members = new Set([authUser._id, targetUserId]);
        if (members.size !== 2) {
          throw new Error("Invalid chat participants");
        }

        // Create a Channel
        const channelId = [authUser._id, targetUserId].sort().join('-');

        const currChannel = client.channel('messaging', channelId, {
          members: [authUser._id, targetUserId],
          created_by_id: authUser._id
        });

        await currChannel.watch();
        setChatClient(client);
        setChannel(currChannel);

      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.")
      } finally {
        setLoading(false);
      }
    }
    initChat()
  }, [tokenData, authUser, targetUserId]);


  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />
  return (
    <div className='h-[93vh]'>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
