import { ErrorComponent } from '@/components/ui/error-component';
import { Loading } from '@/components/ui/loading';
import { useGetChannelIAmIn } from '@/features/chat-room/api/use-get-channel-i-am-in';
import { useGetTopChatRooms } from '@/features/chat-room/api/use-get-top-chat-rooms';
import { RenderRooms } from '@/features/chat-room/components/render-rooms';
import { useSelected } from '@/features/chat-room/hook/use-selected';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDebounce } from 'use-debounce';
import { ChatHeader } from './chat-header';
import { SearchInput } from './search-converstion';
import { TopChannels } from './top-channels';

export const Chat = () => {
  const [value, setValue] = useState('');
  const [search] = useDebounce(value, 500);
  const [more, setMore] = useState(0);
  const { data, isPending, isError, refetch, error } = useGetTopChatRooms();
  const selectedMessages = useSelected((state) => state.selected);
  const clearMessages = useSelected((state) => state.clear);
  const {
    data: channelData,
    isPending: isChannelPending,
    isError: isChannelError,
    refetch: refetchChannel,
    error: channelError,
  } = useGetChannelIAmIn({ more, search });

  const handleRefetch = () => {
    refetch();
    refetchChannel();
  };

  useEffect(() => {
    if (selectedMessages.length > 0) {
      clearMessages();
    }
  }, [selectedMessages, clearMessages]);

  const errorMessage = channelError?.message || error?.message;
  if (isError || isChannelError) {
    return <ErrorComponent onPress={handleRefetch} title={errorMessage} />;
  }

  if (isPending || isChannelPending) {
    return <Loading />;
  }

  const { documents, total } = channelData;

  const handleLoadMore = () => {
    if (documents.length >= total || total === 0) {
      return;
    }
    setMore((prev) => prev + 10);
  };
  return (
    <View style={{ gap: 10, flex: 1 }}>
      <ChatHeader />
      <SearchInput
        placeholder="Search conversations"
        value={value}
        onChangeText={setValue}
      />
      <TopChannels channels={data.documents} />
      <RenderRooms channels={documents} handleLoadMore={handleLoadMore} />
    </View>
  );
};
