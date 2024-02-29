import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';

import './assets/scss/index.scss'
import CommonRouter  from './router/CommonRouter'

//fb
import { useSetRecoilState } from 'recoil';
import { authState, isLoggedInState } from './recoil/authAtom';
import { authService } from './firebase';

function App() { 
  const setAuth = useSetRecoilState(authState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuth(authUser);
        setIsLoggedIn(true);
        console.log('로그인 된 상태', authUser)
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='wrap'>         
        <CommonRouter />       
    </div>
  )
}

export default App
