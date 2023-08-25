import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector, useStore } from 'react-redux';
import { TYPE_USER } from '../../utility/Constants.js';
import ChatCardPreview from './ChatCardPreview.jsx';
import HandleScroll from '../../utility/HandleScroll.js';
import store from '../../Store/store.js';
import {
  GetMessages,
  Updatecommands,
  deletemessage,
  doupdates,
  setUnreadCount
  // setunreadMessages
} from '../../features/SelectedInfo.js';
import { setActiveMessage } from '../../features/chatCardPreviewSlice.js';
import Requests from '../../API/Requests.js';
import { GetPin } from '../../features/composerSlice.js';

const Chatlist = () => {
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const lists = useSelector((store) => store.messageList.messages);
  const selectedChat = useSelector((store) => store.selectedProf.selectedChatID);
  useEffect(() => {
    if (selectedChat) {
      const profile = lists.filter((ele) => ele.profile.profileID == selectedChat)[0];
      if (profile && profile.length != 0) {
        if (profile.updates.length != 0) {
          const changepin = profile.updates.filter(
            (command) => command.updateType == 'PIN' || command.updateType == 'UNPIN'
          );
          if (changepin.length) {
            dispatch(GetPin({ chatid: selectedChat }));
          }
          const maxid = Math.max(...profile.updates.map((command) => command.id));
          console.error(profile.updates);
          dispatch(doupdates({ updates: profile.updates, upid: maxid, chatid: selectedChat }));
        }
        dispatch(setUnreadCount({ count: profile.unreadMessageCount }));
      }
    }
  });
  return (
    <div
      ref={listRef}
      // onScroll={() => handleScroll(listRef)}
      className=" mt-4 h-full w-full overflow-y-auto">
      {lists?.map((chatprev, index) => (
        <ChatCardPreview
          isSelected={selectedChat == chatprev.profile.profileID}
          key={index}
          pinned={chatprev.pinned}
          profid={chatprev.profile.profileID}
          type={chatprev.profile.type}
          image={chatprev.profile.lastProfilePicture}
          size={50}
          profile={chatprev.profile}
          // profileName
          profileName={chatprev.profile.profileName}
          imagecolor={chatprev.profile.defaultProfileColor}
          char={chatprev.profile.profileName[0]}
          isOnline={chatprev.profile.status?.toLowerCase()}
          lastMessage={chatprev.lastMessage}
          unreadMessageCount={chatprev.unreadMessageCount}
          lastseen={chatprev.lastSeen}
        />
      ))}
    </div>
  );
};

export default Chatlist;
