import React, { ChangeEvent, FormEvent, useState } from 'react'
import MyBtn from '../components/ui_elements/MyBtn';
import { Link, useNavigate } from 'react-router-dom';
import { userState, isLoggedInState, logout } from "../recoil/authAtom";
import { useSetRecoilState } from 'recoil';

const Header: React.FC = () => {
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();

    const logoutHandler = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      await logout()
      navigate("/")
    }
    return (
      <header className="header__wrap">
        <div className="logo">
          <h1>My Pick</h1>
        </div>
        <div className="utils-top__wrap">
          <MyBtn
              type='button'
              iconOnly={true}
              btnColor={'btn btn-icon-only'}
              iconName={'icon-video'}
            >
             <span className="ir-text">영상</span>
          </MyBtn>
          <MyBtn
              type='button'
              iconOnly={true}
              btnColor={'btn btn-icon-only'}
              iconName={'icon-alert'}
            >
             <span className="ir-text">알림</span>
          </MyBtn>        
          <MyBtn
              type='button'
              iconOnly={true}
              btnColor={'btn btn-icon-only'}
              iconName={'icon-logout'}
              onClick={logoutHandler}
            >
             <span className="ir-text">로그아웃</span>
          </MyBtn>            
        </div>
      </header>
    )
  }
  
  export default Header