import { useState, createContext, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../utility/useLoclStorage';
import RightSide from './RightSideBar/Rightside';
// import { darkback } from '../../public/images/DarkBackground.png';
// const LayoutContext = createContext(null);
// function reducer(state, action) {
//   switch (action.type) {
//     case 'null':
//       return { ...state, chatid: null };
//     case 'change':
//       // console.log(action)
//       return { ...state, chatid: action.chatid, chattype: action.chattype };
//   }
// }

const Layout = ({ children }) => {
  useEffect(() => {
    const div = document.getElementById('zarp');
    div.dataset.theme = getTheme() ? getTheme() : 'light';
  }, []);

  const { selectedContacts: chatID } = useSelector((state) => state.selectedProf);

  console.error('zarp namosan');
  return (
    <div
      className={'flex h-screen w-screen overflow-hidden font-estedad vsmmobile:relative '}
      id="app-holder">
      <RightSide chatId={chatID} />
      <div
        className="h-full flex-1 flex-row bg-background bg-opacity-90 bg-url[images/pattern.png] bg-cover bg-center pb-6 "
        style={{
          backgroundImage: 'url(images/pattern.png)',
          backgroundBlendMode: 'soft-light',
          backgroundRepeat: 'repeat',
          backgroundSize: '600px',
          width: '600px'
        }}>
        {children}
      </div>
    </div>
  );
};
export default Layout;
