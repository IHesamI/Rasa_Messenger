import React, { useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import ChatFooter from './ChatFooter.jsx';
import Message from '../message/Message.jsx';
import MessageMenu from '../message/MessageMenu.jsx';

const messages = [
  {
    id: 'else',
    seen: true,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ex',
    repliedMessage: 'zendegito be atish mikesham'
  },
  {
    id: 'you',
    seen: true,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ex',
    forwarded: 'Mahmoud'
  },
  {
    id: 'you',
    seen: true,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ex',
    forwarded: 'Mahmoud',
    media: '../../../public/images/profile.jpg'
  }
];

export default function ChatBody() {
  const [openContextMenu, setOpenContextMenu] = React.useState(false);
  function handleRightClick(event, index) {
    event.preventDefault();

    const x = event.clientX;
    const y = event.clientY;

    setOpenContextMenu(true);
    setSelectedMessageIndex(index);
    setContextMenuPosition({ x, y });
  }

  return (
    <div dir="rtl" className="flex h-[100%] w-full flex-col">
      <div className="flex h-[80%] w-full flex-col items-center overflow-hidden">
        <div className="mb-3 h-[70vh] w-full overflow-auto px-5 pt-3">
          {messages.map((message, index) => (
            <div key={index} onContextMenu={(e) => handleRightClick(e, index)}>
              <Message
                content={message.content}
                isSeen={message.seen}
                id={message.id}
                forewardedFrom={message.forwarded}
                repliedTo={message.repliedMessage}
                media={message.media}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-2 h-16">
        <ChatFooter />
      </div>
    </div>
  );
}
