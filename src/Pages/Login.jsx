import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme } from '../utility/useLoclStorage';
import { loginUserProfile } from '../features/profileSlice';
import * as lang from '../hooks/useLang';

export default function Login() {
  // const lang=uselang.lang();
  const dispatch = useDispatch();
  const values = useRef({
    email: '',
    password: ''
  });
  const [LoginError, setLoginError] = useState('');

  useEffect(() => {
    const div = document.getElementById('zarp');
    div.dataset.theme = getTheme() ? getTheme() : 'light';
    // console.log(div.dataset.theme)
  }, []);

  async function handleRegisterClick(event) {
    setLoginError(null)
    event.preventDefault();
    // Check for empty fields
    if (!values.current.email || !values.current.password) {
      alert('لطفاً همه فیلدها را پر کنید.');
    } else {
      try {
        await dispatch(loginUserProfile(values.current));
        // window.location.href = '/';
      } catch (err) {
        setLoginError("اشتباهی رخ داد، مجددا امتحان کنید.")
        console.log(err);
      }
    }
  }

  const changeinput = (name, value) => {
    values.current[name] = value;
  };
  return (
    <div dir="rtl" className="bg-complete bg-background bg-opacity-90 bg-url[images/pattern.png] bg-cover bg-center"
    style={{
      backgroundImage: 'url(images/pattern.png)',
      backgroundBlendMode: 'soft-light',
      backgroundRepeat: 'repeat',
      backgroundSize: '600px',

    }}
    >
      <div className="main-div
      m-auto relative">
        <div className="flex flex-col my-5 items-center justify-center">
          <a href="/">
            <img width={150} src="images/rasa.png" />
          </a>
        </div>
        <div className="sm:max-w-lg sm:rounded-lg w-full bg-color2 overflow-hidden rounded border  bg-color px-6 py-4 shadow-md ">
          <div className="mb-5 text-[20px] text-center text-text1">ورود</div>
          <form>
            <div>
              <label htmlFor="name" className="undefined mt-3 block text-sm font-medium text-text1">
                ایمیل
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  className="input-div text-text1"
                  onChange={(e) => {
                    changeinput('email', e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="undefined block text-sm font-medium text-text1">
                رمز عبور
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  className="input-div text-text1"
                  onChange={(e) => {
                    changeinput('password', e.target.value);
                  }}
                />
              </div>
            </div>
            <a href="#" className="text-xs text-[rgb(0,132,105)] hover:underline">
              رمز عبور خود را فراموش کرده اید؟
            </a>
            <div className="mt-4 flex flex-col items-center">
              <button
                onClick={handleRegisterClick}
                className="w-full rounded-md bg-[rgb(0,92,75)] px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-[#7fc2cf] focus:bg-[#135461] focus:outline-none">
                {/* {lang.uselang('enter')} */}
                ورود
              </button>
              {LoginError && <p className="text-xs text-red-500 mt-5">{LoginError}</p>}

            </div>
          </form>
          <div className="mt-4 text-text1">
            اکانت ندارید؟{' '}
            <span>
              <a className="text-[rgb(0,132,105)] hover:underline" href="/Register">
                ثبت نام کنید
              </a>
            </span>
          </div>
          <div className="my-4 flex w-full items-center">
            <hr className="w-full" />
            <p className="px-3 text-text1">یا</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              aria-label="Login with Google"
              type="button"
              className="flex w-full items-center justify-center space-x-4 rounded-md border p-2 focus:ring-2 focus:ring-violet-400 focus:ring-offset-1 dark:border-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="mx-5 h-5 w-5 fill-current text-text1">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p className="text-text1">ورود با حساب گوگل</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
