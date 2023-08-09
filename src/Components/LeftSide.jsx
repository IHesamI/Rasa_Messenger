import React from 'react';
import { UilTimes, UilPen } from '@iconscout/react-unicons';
// import { UilPen } from '@iconscout/react-unicons'
import { Files, Links, Medias, Musics, Voices } from './ProfileParts';
export default function LeftSide({ isActive, profile, setActive, setlayout }) {
  const [filepart, setfilepart] = React.useState({
    0: 1,
    1: 0,
    2: 0,
    3: 0,
    4: 0
  });
  const changesetpat = (num) => {
    //all 0 just num 1
    let newfilepart = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0
    };
    newfilepart[num] = 1;
    setfilepart(newfilepart);
  };
  return (
    <div
      className={`flex flex-col h-screen transition-all duration-200 ease-in bg-color2 shadow-md border-r-2 border-bghovor`}>
      <div className="flex bg-color2 items-center justify-between px-4 border border-bghovor">
        <div className="flex flex-row w-fit h-[70px] place-items-center">
          <button
            onClick={(e) => {
              setActive(false);
            }}>
            <UilTimes className="w-8 h-8 text-text1 cursor-pointer" />
          </button>
          <div className="p-1 cardP">اطلاعات پروفایل</div>
        </div>
        <div>
          <button onClick={() => setlayout(1)}>
            <UilPen className=" text-text1 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-end place-items-end bg-[url('images/profile.jpg')] w-full h-[350px] bg-cover bg-center bg-no-repeat mb-0 md:h-[350px]">
        {isActive ? (
          <>
            <div className="p-7 pb-0 text-white font-bold text-[25px] ">Zahra</div>
            <div className="p-7 pt-0 text-white text-[15px] ">Last Seen recently</div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col w-full h-[calc(100%-420px)] bg-color1">
        <div className="w-full h-[50px] bg-color2 flex flex-row  place-items-center border-b-1">
          <div
            className={`category-part ${filepart[0] == 1 ? 'bg-color1' : 'bg-color2'}`}
            onClick={() => changesetpat(0)}>
            رسانه
          </div>
          <div
            className={`category-part ${filepart[1] == 1 ? 'bg-color1' : 'bg-color2'}`}
            onClick={() => changesetpat(1)}>
            فایل ها
          </div>
          <div
            className={`category-part ${filepart[2] == 1 ? 'bg-color1' : 'bg-color2'}`}
            onClick={() => changesetpat(2)}>
            لینک
          </div>
          <div
            className={`category-part ${filepart[3] == 1 ? 'bg-color1' : 'bg-color2'}`}
            onClick={() => changesetpat(3)}>
            موسیقی
          </div>
          <div
            className={`category-part ${filepart[4] == 1 ? 'bg-color1' : 'bg-color2'}`}
            onClick={() => changesetpat(4)}>
            صدا
          </div>
        </div>
        <div>
          {filepart[0] == 1 ? (
            <Medias />
          ) : filepart[1] == 1 ? (
            <Files />
          ) : filepart[2] == 1 ? (
            <Links />
          ) : filepart[3] == 1 ? (
            <Musics />
          ) : filepart[4] == 1 ? (
            <Voices />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
