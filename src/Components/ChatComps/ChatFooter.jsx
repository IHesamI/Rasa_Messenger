import React, { useEffect, useRef, useState } from 'react';
import { UilSmile, UilMessage, UilPaperclip, UilTimes } from '@iconscout/react-unicons';
// import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { json } from 'react-router-dom';
import EmojiPicker from '../../ui/EmojiPicker';
import Text from '../../ui/Text';
import TextProcessorMenu from '../../ui/TextProcessorMenu';
import TextProcessor from '../../utility/TextProcessor';
import FileUploader from '../../ui/FileUploader';
import Requests from '../../API/Requests';
import { composerActions } from '../../features/composerSlice';
import { GetMessages, editmsg } from '../../features/SelectedInfo';
import PopUp from '../../ui/PopUp';
import Poll from './Poll';
import UploadFile from '../../ui/UploadFile';

export default function ChatFooter({ id, chattype }) {
  const {
    handleEmojiPicker,
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
    setopenemoji,
    handleKeyLeftRight,
    ProcessorValues
  } = TextProcessor([]);
  const Isactive = useSelector((state) => state.composer);
  const [openAttach, setOpenAttach] = useState(false);
  const [openPoll, setopenPoll] = useState(false);
  const [fileuploaded, setfileuploaded] = useState(null);

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
    // if (divref.current) {
    //   // console.log('wer');
    //   // divref.current.innerText = Isactive.composerValue;
    // }
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  const dispatch = useDispatch();
  const [mousepositoin, setmousepositoin] = useState({ x: 0, y: 0 });
  const needActoin = Isactive.isEditting || Isactive.isReplying || Isactive.isForwarding;
  function handleKeyDown(event) {
    handleKeyLeftRight(event);
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents the default Enter behavior (usually adding a new line)
      SelectRequestType(); // Call the function
    }
  }
  async function SelectRequestType() {
    // IF IS EDITING 
    if (Isactive.isEditting) {
      console.log();
      dispatch(editmsg({ msgId: Isactive.editID, newtext: ProcessorValues.current.rawtext }));
      await Requests().EditMessage(Isactive.editID, ProcessorValues.current.rawtext);
    } else {
      // IF REPLIED TO SOMETHING 
      if (Isactive.isReplying) {
        Requests().sendText(
          id,
          ProcessorValues.current.rawtext,
          JSON.stringify(ProcessorValues.current.sorted),
          Isactive.replyID
        );
      }
      // IF FORWARDED FROM 
      if (Isactive.isForwarding) {
        Requests().sendText(
          id,
          ProcessorValues.current.rawtext,
          JSON.stringify(ProcessorValues.current.sorted),
          null,
          Isactive.forwardID
        );
      }
      // ONLY SEND A MESSAGE 
      else {
        console.error(id);
        Requests().sendText(
          id,
          ProcessorValues.current.rawtext,
          JSON.stringify(ProcessorValues.current.sorted)
        );
      }
      // console.log(Isactive.editID);
      // dispatch(editmsg({ msgId: Isactive.editID, newtext: divref.current.innerText }));
      // await Requests().EditMessage(Isactive.editID, divref.current.innerText);
    }

    ProcessorValues.current.rawtext = '';
    divref.current.innerText = '';
    setentitycontainers([]);
    dispatch(composerActions.clear());
    // setTimeout(dispatch(GetMessages({ type: chattype, ID: id, message_id: 0 })), 1000);
  }
  return (
    <div className=" sticky bottom-0 flex flex-col">
      {needActoin ? (
        <div className="flex-row= flex h-[30px] w-[100%] bg-color2 pr-2 pt-1">
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
            openemoji ? 'top-[130px]' : ''
          }`}>
        <div
          className={` flex  w-[100%] flex-row items-center justify-between sticky bottom-0
          ${needActoin ? '' : ''} bg-color2  p-2 text-color4`}>
          <button className="mx-1 h-8 w-8 text-text1 " onClick={SelectRequestType}>
            <UilMessage />
          </button>
          {/* </UilPaperclip> */}
          <FileUploader openpull={setopenPoll} openfile={setfileuploaded} chattype={chattype} />
          {/* <input type="text" dir='auto' /> */}
          <div
            ref={divref}
            dir="auto"
            contentEditable
            onKeyDown={handleKeyDown} // Attach the onKeyDown event handler
            onClick={handleclick}
            onSelectCapture={handleSelect}
            onInput={handleonInput}
            suppressContentEditableWarning={true}
            className=" flex h-auto max-h-[50px] w-[90%] flex-row overflow-hidden
            whitespace-pre-wrap
            break-all border-none shadow-none outline-none focus:shadow-none active:shadow-none">
            {Isactive.editvalue ? Isactive.editvalue : ''}
          </div>
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setopenemoji(!openemoji);
              }}
              className="mx-1 h-8 w-8 text-text1 ">
              <UilSmile />
            </button>
            {openTextProcessor && <TextProcessorMenu ChangeEntities={ChangeEntities} />}
            {/* {openAttach &&

} */}

            {fileuploaded && (
              <PopUp title="انتخاب فایل" setIsModalOpen={setfileuploaded}>
                <UploadFile id={id} fileuploaded={fileuploaded} />
              </PopUp>
            )}
            {openPoll && (
              <PopUp title="ایجاد نظرسنجی" setIsModalOpen={setopenPoll}>
                <Poll />
              </PopUp>
            )}
          </div>
        </div>
        {openemoji && (
          <>
            <EmojiPicker handler={handleEmojiPicker} openemoji={openemoji} />
            {/* <EmojiPicker theme={localStorage.getItem('theme')} onEmojiClick={handleEmojiPicker} /> */}
          </>
        )}
      </div>
    </div>
  );
}
