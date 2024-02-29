import React from 'react'
import { Routes, Route, Navigate, Switch, Redirect  } from 'react-router-dom'

// 레이아웃
import Intro from '../pages/Intro'
import Form from '../books/Form'
import ListForm from '../books/ListForm'
import OnlyBodyLy from '../layout/onlyBodyLy'
import BookMainLayout from '../layout/BookMainLayout'

// BOOK
import BookMain from '../books/BookMain'
import BookList from '../books/BookList'
import ReadCommon from '../books/ReadCommon'

//statement
import { useRecoilValue } from 'recoil';
import { authState, isLoggedInState } from '../recoil/authAtom';

function CommonRouter() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

    return (
      <Routes> 
          <Route element={<OnlyBodyLy />}>          
            <Route path="/" element={<Intro />}></Route>     
            <Route path="/Form" element={<Form />} />     
            <Route path="/ListForm" element={<ListForm />} />       
          </Route>                                            
          <Route element={<BookMainLayout />}>          
            <Route path="/BookMain" element={<BookMain />}></Route> 
            <Route path="/BookList/:bookId" element={<BookList />} />             
          </Route>                                                                
      </Routes>
    )
  }
  
  export default CommonRouter