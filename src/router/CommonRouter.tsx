import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'
import { isLogin } from '../utils/common';

// 레이아웃
import Intro from '../pages/Intro'
// import Signup from '../pages/member/Signup'
// import Edit from '../pages/member/Edit'
// import Mypage from '../pages/member/Mypage'
// import Main from '../pages/Main'
import Form from '../pages/Form'
import Layout from '../layout/layout';
import OnlyBodyLy from '../layout/onlyBodyLy';
import BookLayout from '../layout/BookLayout';

// BOOK
import BookMain from '../books/BookMain'
import DetailList from '../books/DetailList'

function CommonRouter() {
    return (
      <Routes>   
        <Route element={<OnlyBodyLy />}>                          
          <Route path="/" element={isLogin() ? <Navigate to="/BookMain" /> : <Intro />} />    
        </Route>               
        <Route element={<OnlyBodyLy />}>      
          <Route path="/Intro" element={isLogin() ? <Navigate to="/BookMain" /> : <Intro />} />
        </Route>                         
        <Route element={<BookLayout />}>          
          <Route path="/Form" element={<Form />}></Route>             
        </Route>   
        <Route element={<BookLayout />}>          
          <Route path="/BookMain" element={<BookMain />}></Route>             
        </Route>   
        <Route element={<BookLayout />}>          
          <Route path="/DetailList/:book_id" element={<DetailList />} />                      
        </Route>                 
      </Routes>
    )
  }
  
  export default CommonRouter