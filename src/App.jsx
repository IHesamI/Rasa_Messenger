// import { ChatLayout } from './Components/ChatComps/';
import Layout from './Components/Layout.jsx';
import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import WorkerBuilder from './Workers/web/WorkerBuilder';
import Worker from './Workers/web/RequestHandler';
import { GetContacts, setMessages } from './features/chatCardPreviewSlice';
import ChatContainer from './Components/ChatComps/ChatContainer';
// import { layoutContext } from './Components/Layout.jsx';
import { io } from 'socket.io-client';

function App() {
  const token = useSelector((state) => state.profile.jwt);
  const dispatch = useDispatch();
  const worker = new WorkerBuilder(Worker);

  useEffect(() => {
    // worker.postMessage({ type: 'init', io, url: 'http://localhost:3000/' });
    worker.postMessage({ type: 'init'});
    worker.onmessage = (msg) => {
      console.error(msg);
    };

    // dispatch(GetContacts());
    // document.addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    // });
  }, []);

  return (
    <Layout>
      <ChatContainer />
    </Layout>
  );
}

export default App;
