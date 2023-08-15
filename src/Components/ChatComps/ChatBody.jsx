import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ChatFooter from './ChatFooter.jsx';
import Message from '../message/Message.jsx';
import ImagePreviewer from '../media-previewer/ImagePreviewer.jsx';
import { TYPE_CHANNEL, TYPE_GROUP } from '../../utility/Constants.js';
import MessageDateGroup from '../message/MessageDateGroup.jsx';
import MessageVoice from '../message/MessageVoice.jsx';
import { UilArrowDown } from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';

export default function ChatBody({ chattype }) {
  const bodyref = useRef(null);
  const messages = useSelector((state) => state.selectedProf.Chatmessages);
  const [buttonhidden, setbuttonhidden] = useState(true);
  function handleonScroll() {
    if (bodyref.current?.scrollTop == bodyref.current.scrollHeight - bodyref.current.clientHeight) {
      console.log('zarp');
      setbuttonhidden(true);
      console.log('1');
    } else {
      if (buttonhidden) {
        console.log('2');
        setbuttonhidden(false);
      }
    }
  }

  // TODO
  const footerallowed = chattype == TYPE_CHANNEL ? false : chattype == TYPE_GROUP ? true : true;
  const [preview, setPreview] = useState(false);
  // function handleRightClick(event, index) {
  //   event.preventDefault();
  // }

  function scrolltobottom() {
    // bodyref.current.scrollTop = bodyref.current.scrollHeight;
    const startPosition = bodyref.current.scrollTop;
    const endPosition = bodyref.current.scrollHeight - bodyref.current.clientHeight;
    const duration = 1000;
    const startTime = performance.now();

    // const scrollHeight = bodyref.current.scrollHeight;
    // const scrollStep = Math.PI / (scrollHeight / 2);
    // let count = 0;
    function scrollAnimation(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress); // Apply easing function if desired
      const newPosition = startPosition + (endPosition - startPosition) * easedProgress;
      bodyref.current.scrollTop = newPosition;
      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(scrollAnimation);

    // scrollAnimation();
    // console.log(bodyref.current)
    // bodyref.current.scrollIntoView({ behavior: 'smooth' });
  }
  
  return (
    <div
      dir="rtl"
      className={
        `flex h-[100%] flex-col
        // mb-[-30px]
        `
        // mb-[-150px]
      }>
      <div className="flex h-[70%] w-full flex-col items-center overflow-hidden">
        <div
          className="mb-2 h-[105vh] w-full overflow-auto px-5 pt-3"
          // onScroll={() => console.log('hello')}
          onScroll={handleonScroll}
          ref={bodyref}>
          <button
            onClick={scrolltobottom}
            className={`${
              buttonhidden ? 'hidden' : ''
            } p-3 bg-color1 rounded-full absolute top-[65%] right-[85%] z-10`}>
            <UilArrowDown />
          </button>
          <MessageDateGroup date={'2023-07-20'}>
            {messages?.map((message, index) => (
              <div key={index}>
                {/* {
    "messages": [
        {
            "messageID": 1,
            "text": "سلام خوبی ؟",
            "time": "2023-08-14T13:57:37.447431",
            "media": null,
            "viewCount": 2,
            "sender": {
                "profileID": 1000,
                "profileName": "Ali",
                "defaultProfileColor": "#e6c773",
                "lastProfilePicture": null
            },
            "isPinned": false,
            "isEdited": false
        },
        {
            "messageID": 2,
            "text": "سلام. خوبم ممنون تو چطوری ؟",
            "time": "2023-08-14T13:57:41.209955",
            "media": null,
            "viewCount": 1,
            "sender": {
                "profileID": 1001,
                "profileName": "Sara",
                "defaultProfileColor": "#e68873",
                "lastProfilePicture": {
                    "preLoadingContent": "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+b/4ofGDwJ4ns4vgafC2nwveeCfDEtv4m1vVr7WfEWgfGiTwjKuu2OnTpdabY6HpXibxz9li1q1uYNYktoFS3n8yCzs/7FKKKvh+lSweSZdSpwlP2lJYidTE4jFYqrKdZUnNe0r16klTTvKMI2jGU5uzcmfoGczeJzbGQnGnBYaoqMHRp06LdOFqcFNU4qMnGMFaXKpdG3FRUf//Z"
                }
            },
            "isPinned": false,
            "isEdited": false
        }
    ],
    "messageId": 1,
    "downFinished": true,
    "upFinished": true
} */}
                <Message
                  // content={message.content}
                  isSeen={message.viewCount > 1 ? true : false}
                  id={message.messageID}
                  chattype={chattype}
                  creator={message.sender}
                  time={message.time}
                  media={message.media}
                  ispinned={message.ispinned}
                  isEdited={message.isEdited}
                  text={message.text}
                  // chattype={chattype}
                  handleMediaMessage={() => setPreview(!preview)}
                />
              </div>
            ))}
          </MessageDateGroup>
          {/* <MessageDateGroup date={'2023-07-22'}>
            {messages.map((message, index) => (
              <div
                key={index}
                // onContextMenu={(e) => handleRightClick(e, index)}
              >
                <Message
                  content={message.content}
                  isSeen={message.seen}
                  id={message.id}
                  forewardedFrom={message.forwarded}
                  repliedTo={message.repliedMessage}
                  media={message.media}
                  handleMediaMessage={() => setPreview(!preview)}
                />
              </div>
            ))}
            <MessageVoice
              id="you"
              audioUrl="audios/12 Peaceful With Nature (1).mp3"
              audioID="you"
            />
          </MessageDateGroup> */}
        </div>
        {footerallowed && (
          <div className=" h-16 w-[80%] vsmmobile:mb-[7rem] smmobile:mb-[7rem]">
            <ChatFooter />
          </div>
        )}
      </div>
      {preview
        ? createPortal(
            <ImagePreviewer handleClose={() => setPreview(false)} />,
            document.getElementById('app-holder')
            // ||
            // document.getElementById('root')
          )
        : null}
    </div>
  );
}
