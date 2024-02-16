import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'
import { isLogin } from '../utils/common';

// 레이아웃
import Intro from '../pages/Intro'
// import Form from '../pages/Form'
import OnlyBodyLy from '../layout/onlyBodyLy';
import BookMainLayout from '../layout/BookMainLayout';

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
          {/* <Route element={<BookLayout />}>          
            <Route path="/Form" element={<Form />}></Route>             
          </Route>    */}
          <Route element={<BookMainLayout />}>          
            <Route path="/BookMain" element={<BookMain />}></Route>             
          </Route>   
          <Route element={<BookMainLayout />}>          
            <Route path="/DetailList/:bookId" element={<BookSubList />} />                      
          </Route> 
          <Route element={<OnlyBodyLy />}>          
            <Route path="/ReadDetail/:id" element={<ReadDetail />} />                      
          </Route>   
          <Route element={<BookMainLayout />}>          
            <Route path="/DetailListNote/:noteCode" element={<DetailListNote />} />                      
          </Route>      
          <Route element={<OnlyBodyLy />}>          
            <Route path="/ReadNoteDetail/:id" element={<ReadNoteDetail />} />                      
          </Route> 
          <Route element={<OnlyBodyLy />}>          
            <Route path="/ReadTapeDetail/:bookid" element={<ReadTapeDetail />} />                      
          </Route>  
          <Route element={<BookMainLayout />}>          
            <Route path="/DetailListAudio/:bookId" element={<DetailListAudio />} />                      
          </Route>                              
      </Routes>
    )
  }
  
  export default CommonRouter