import { BrowserRouter, Routes, Route, json } from 'react-router-dom'; // Import Navigate from react-router-dom
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import routes from './Routes/Routes';
import Login from '../Pages/Login';
import { toast } from 'react-toastify';

const AppRouter = () => {
  const [isAuth, setIsAuth] = useState(false);
  // const lang=uselang();
  // if (!localStorage.getItem['fa']) {
  //   Object.keys(lang).forEach(key=>
  //     localStorage.setItem(key,JSON.stringify(lang[key])))
  // }
  const stateToken = useSelector((state) => state.profile.profileData.jwt);
  console.error(stateToken);
  const [connected, setConnected] = useState(false);
  // const socket = useRef();
  useEffect(() => {
    if (stateToken) {
      setIsAuth(true);
      // toast.success('ورود با موفقیت انجام شد');
    }
  }, [stateToken]);
  useEffect(() => {
    if (!connected) {
      // socket.current = io('http://localhost:3000/');
      setConnected(true);
    }
  }, []);

  function routeToRender(route) {
    let componentToRender;

    if (route.Private) {
      componentToRender = isAuth ? <route.component /> : <Login />;
    } else {
      componentToRender = <route.component />;
    }
    return componentToRender;
  }
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={routeToRender(route)} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
