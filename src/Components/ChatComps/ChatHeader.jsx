import { UilArrowRight, UilSearch } from '@iconscout/react-unicons';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { TYPE_CHANNEL, TYPE_USER, TYPE_GROUP } from '../../utility/Constants.js';
import Pin from './Pin.jsx';

import Avatar from './Avatar.jsx';
import ChatHeaderSettings from './ChatHeaderSettings.jsx';
import { resetChatId } from '../../features/SelectedInfo.js';

const ChatHeader = ({ active, setActive, chatsetter, chattype, chatid }) => {
  const dispatch = useDispatch();
  const chatProf = useSelector((state) => state.messageList.messages);
  const selectedProfile = chatProf.filter((item) => item.profile.profileID == chatid)[0];
  const ChatInfo =
    chattype == TYPE_USER
      ? '12:22' // ShouldChange
      : chattype == TYPE_GROUP
      ? 4
      : 1200;
  return (
    <>
      <div
        onClick={(e) => {
          setActive((prev) => !prev);
        }}
        className="flex h-[70px] w-full cursor-pointer items-center justify-between bg-color2 px-1 font-iRANSans shadow-inner">
        <div id="header-account" className="flex h-full items-center gap-2">
          <button
            className=" vsmmobile:visible laptop:hidden desktop:hidden"
            onClick={(e) => {
              console.log('hello');
              e.stopPropagation();
              dispatch(resetChatId());
            }}>
            <UilArrowRight className="h-8 w-8 cursor-pointer text-text1" />
          </button>
          <div className="h-[75%] w-[75%] flex-1 ">
            {selectedProfile.profile.lastProfilePicture ? (
              <img
                src={`data:image/jpeg;base64,${selectedProfile.profile.lastProfilePicture.preLoadingContent}`}
                className="h-full w-full rounded-full"
              />
            ) : (
              <Avatar
                imagecolor={selectedProfile.profile.defaultProfileColor}
                char={selectedProfile.profile.profileName[0]}
                // isOnline={true}
              />
            )}
          </div>
          <div className="">
            <h3 className="text-lg font-semibold text-text1">
              {selectedProfile.profile.profileName}{' '}
            </h3>
            <div className="text-sm text-slate-400">{ChatInfo}</div>
          </div>
        </div>
        <div className="flex flex-row">
          <button>
            <UilSearch className="h-6 w-6 cursor-pointer text-text1" />
          </button>
          {<ChatHeaderSettings active={active} />}
        </div>
      </div>
      {/*
      <Pin />
             */}
    </>
  );
};

export default ChatHeader;
