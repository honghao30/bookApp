import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'
import { isLogin } from '../utils/common';

// 레이아웃
import Intro from '../pages/Intro'
import Form from '../pages/Form'
import OnlyBodyLy from '../layout/onlyBodyLy';
import BookLayout from '../layout/BookLayout';
import BookMainLayout from '../layout/BookMainLayout';
import BookDetail from '../layout/BookDetail';

// BOOK
import BookMain from '../books/BookMain'
import BookSubList from '../books/DetailList'
import ReadDetail from '../books/ReadDetail'
import DetailListNote from '../books/DetailListNote'
import ReadNoteDetail from '../books/ReadNoteDetail'
import ReadTapeDetail from '../books/ReadTapeDetail'
import DetailListAudio from '../books/DetailListAudio'

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
        <Route element={<BookMainLayout />}>          
          <Route path="/BookMain" element={<BookMain />}></Route>             
        </Route>   
        <Route element={<BookLayout />}>          
          <Route path="/DetailList/:bookId" element={<BookSubList />} />                      
        </Route> 
        <Route element={<BookLayout />}>          
          <Route path="/ReadDetail/:Id" element={<ReadDetail />} />                      
        </Route>   
        <Route element={<BookLayout />}>          
          <Route path="/DetailListNote/:noteCode" element={<DetailListNote />} />                      
        </Route>      
        <Route element={<BookLayout />}>          
          <Route path="/ReadNoteDetail/:id" element={<ReadNoteDetail />} />                      
        </Route> 
        <Route element={<BookDetail />}>          
          <Route path="/ReadTapeDetail/:bookid" element={<ReadTapeDetail />} />                      
        </Route>  
        <Route element={<BookLayout />}>          
          <Route path="/DetailListAudio/:audioId" element={<DetailListAudio />} />                      
        </Route>                                                
      </Routes>
    )
  }
  
  export default CommonRouter