import React, { useState, useContext, useEffect } from 'react';
import { ChatBody, ChatHeader } from '.';
import LeftLayout from '../LeftSideBar/LeftLayout';
import { LayoutContext } from '../Layout';
import { TYPE_USER } from '../../utility/Constants';
export default function UserChat() {
  const [active, setActive] = useState(false);
  const chatTools = useContext(LayoutContext);
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        chatTools.setChatId(null);
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-row">
        {chatTools.chatid ? (
          <>
            <div
              className={`
            relative
            desktop:w-[100%]
            laptop:w-[100%]
            smmobile:w-[100%]
            ${active ? 'vsmmobile:w-0' : 'vsmmobile:w-full'}
            `}>
              <ChatHeader chatsetter={chatTools.setChatId} setActive={setActive} />
              <ChatBody />
            </div>
            <LeftLayout CHATTYPE={TYPE_USER} id={1} active={active} setActive={setActive} />
          </>
        ) : (
          <></>
        )}
      </div>
      {/* {active ?  : <></>} */}
    </>
  );
}
