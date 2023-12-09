import { BrowserRouter, Routes, Route, json } from 'react-router-dom'; // Import Navigate from react-router-dom
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import routes from './Routes/Routes';
import Login from '../Pages/Login';
import { toast } from 'react-toastify';
// import { uselang } from '../hooks/useLang';
import lang from '../utility/langs.json'
// import { data } from 'autoprefixer';
const AppRouter = () => {
  const [isAuth, setIsAuth] = useState(false);
  // const lang=uselang();
  if (!localStorage.getItem['fa']) {
    Object.keys(lang).forEach(key=>
      localStorage.setItem(key,JSON.stringify(lang[key])))
  }
  const stateToken = useSelector((state) => state.profile.jwt);
  useEffect(() => {
    if (stateToken !== '') {
      setIsAuth(true);
      toast.success('ورود با موفقیت انجام شد');
      console.log('Stoken', stateToken);
    }
  }, [stateToken]);
  
  console.log(isAuth);
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
