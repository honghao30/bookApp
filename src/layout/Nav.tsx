import React, { ChangeEvent, FormEvent, useState } from 'react'
import MyBtn from '../components/ui_elements/MyBtn';
import { Link, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
    const navigate = useNavigate();

    const AddPost = () => {
      navigate("/Form")
    }
    const goHome = () => {
      navigate("/")
    }
    const goMypage = () => {
      navigate("/Mypage")
    }
    return (
        <div className="BottomNav__wrap">
          <MyBtn
              type='button'
              iconOnly={true}
              btnColor={'btn btn-icon-only'}
              iconName={'icon-home'}
              onClick={ goHome }
            >
             <span className="ir-text">홈</span>
          </MyBtn>   
          <MyBtn
              type='button'
              iconOnly={true}
              btnColor={'btn btn-icon-only'}
              iconName={'icon-search'}
            >
             <span className="ir-text">검색</span>
          </MyBtn> 
          <MyBtn
              type='button'
              iconOnly={true}
              btnColor={'btn btn-icon-only'}
              iconName={'icon-add-post'}
              onClick={ AddPost }
            >
             <span className="ir-text">등록</span>
          </MyBtn> 
          <MyBtn
              type='button'
              iconOnly={true}
              btnColor={'btn btn-icon-only'}
              iconName={'icon-calendar'}
            >
             <span className="ir-text">일정</span>
          </MyBtn>          
          <button type="button" className="btn btn-icon-only" onClick={ goMypage }>
            <i className="icon-profile">
              <img src="./images/temp/profile.jpg" alt="이름" />
            </i>
            <span className="ir-text">마이</span>
          </button>          
        </div>
    )
}

export default BottomNav