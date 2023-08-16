import React, { useEffect, useRef, useState } from 'react';
import { UilSmile, UilMessage, UilPaperclip, UilTimes } from '@iconscout/react-unicons';
// import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from '../../utility/EmojiPicker';
import Text from '../../utility/Text';
import TextProcessorMenu from '../../utility/TextProcessorMenu';
import TextProcessor from '../../utility/TextProcessor';
import FileUploader from '../../utility/FileUploader';
import PopUp from '../../utility/PopUp';
import Poll from './Poll';
import Requests from '../../API/Requests';
import { composerActions } from '../../features/composerSlice';

export default function ChatFooter({ id }) {
  const [openPoll, setopenPoll] = useState(false);
  const {
    handleEmojiPicker,
    handleKeyDown,
    handleSelect,
    handleonInput,
    handleclick,
    openTextProcessor,
    divref,
    setOpenTextProcessor,
    entitycontainers,
    setentitycontainers,
    ChangeEntities,
    openemoji,
    setopenemoji
  } = TextProcessor([
    // { id: 1, lower: 0, upper: 2, content: '012', style: ['bold', 'strike'] },
    // { id: 2, lower: 3, upper: 8, content: '345678', style: ['strike'] },
    // { id: 3, lower: 9, upper: 10, content: '91', style: ['italic ', 'spoiler'] }
  ]);
  const Isactive = useSelector((state) => state.composer);
  const [openAttach, setOpenAttach] = useState(false);
  const emoji = useState('');

  function closeTextProcessor() {
    setOpenTextProcessor(false);
  }

  useEffect(() => {
    function handleDocumentClick(event) {
      const clickedElement = event.target;
      if (divref.current && !divref.current.contains(clickedElement)) {
        closeTextProcessor();
      }
    }
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  const dispatch = useDispatch();
  const [mousepositoin, setmousepositoin] = useState({ x: 0, y: 0 });
  const needActoin = Isactive.isEditting || Isactive.isReplying || Isactive.isForwarding;
  return (
    <div className="relative top-[0px] flex flex-col">
      {needActoin ? (
        <div className="flex h-[30px] w-[100%] flex-row gap-3 rounded-t-lg bg-color2 pr-2 pt-1">
          <button onClick={() => dispatch(composerActions.clear())}>
            <UilTimes className={'text-color3'} />
          </button>
          <div className=" line-clamp-1 w-[30%] border-r-2 border-color3 pr-2 text-text1">
            {Isactive.composerValue}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        dir="rtl"
        className={`
          flex flex-col gap-3 transition-all duration-100 ease-in vsmmobile:relative ${
            openemoji ? 'top-[-110px]' : ''
          }`}>
        <div
          className={`m-auto flex  w-[100%] flex-row items-center justify-between  
          ${needActoin ? '' : 'rounded-xl'} bg-color2  p-2 text-color4`}>
          <button
            className="mx-1 h-8 w-8 text-text1 "
            onClick={() => Requests().sendText(id, divref.current.innerText)}>
            <UilMessage />
          </button>
          {/* </UilPaperclip> */}
          <FileUploader setopenPoll={setopenPoll} />
          {/* <input type="text" dir='auto' /> */}
          <div
            ref={divref}
            dir="auto"
            contentEditable
            onClick={handleclick}
            onSelectCapture={handleSelect}
            onInput={handleonInput}
            suppressContentEditableWarning={true}
            className=" flex h-auto max-h-[50px] w-[90%] flex-row overflow-hidden break-all border-none shadow-none outline-none focus:shadow-none active:shadow-none"></div>
          <div>
            <button onClick={() => setopenemoji(!openemoji)} className="mx-1 h-8 w-8 text-text1 ">
              <UilSmile />
            </button>
            {openTextProcessor && <TextProcessorMenu ChangeEntities={ChangeEntities} />}
            {/* {openAttach &&

} */}
          </div>
        </div>
        {openemoji && (
          <>
            <EmojiPicker handler={handleEmojiPicker} openemoji={openemoji} />
            {/* <EmojiPicker theme={localStorage.getItem('theme')} onEmojiClick={handleEmojiPicker} /> */}
          </>
        )}
        {openPoll && (
          <PopUp title="ایجاد نظرسنجی" setIsModalOpen={setopenPoll}>
            <Poll />
          </PopUp>
        )}
      </div>
    </div>
  );
}
