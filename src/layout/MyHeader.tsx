import React, { useEffect, useState } from 'react'
import MyBtn from '../components/ui_elements/MyBtn';

const Header: React.FC = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(storedUserInfo);
    if (userInfo && userInfo.user) {
      setUserName(userInfo.user);
    }
  }, []);  

  return (
    <header className="header__wrap my-page">
        <div className="user-name">{userName} 님</div>
        <MyBtn
            type='button'
            iconOnly={true}
            btnColor={'btn btn-icon-only'}
            iconName={'icon-hamburger'}
          >
           <span className="ir-text">메뉴</span>
        </MyBtn> 
    </header>
  )
}

export default Header;
