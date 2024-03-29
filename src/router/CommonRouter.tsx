import React from 'react'
import { Routes, Route  } from 'react-router-dom'

// 레이아웃
import Intro from '../pages/Intro'
import Form from '../books/Form'
import ListForm from '../books/ListForm'
import OnlyBodyLy from '../layout/onlyBodyLy'
import BookMainLayout from '../layout/BookMainLayout'
import MyPage from '../books/MyPage'
// BOOK
import BookMain from '../books/BookMain'
import BookList from '../books/BookList'
import ReadCommon from '../books/ReadCommon'

function CommonRouter() {
    return (
      <Routes> 
          <Route element={<OnlyBodyLy />}>          
            <Route path="/" element={<Intro />}></Route>             
          </Route>                                            
          <Route element={<BookMainLayout />}>          
            <Route path="/BookMain" element={<BookMain />}></Route>             
          </Route>   
          <Route element={<BookMainLayout />}>          
            <Route path="/BookList/:bookId" element={<BookList />} />                      
          </Route> 
          <Route element={<OnlyBodyLy />}>          
            <Route path="/ReadCommon/:id" element={<ReadCommon />} />                      
          </Route>  
          <Route element={<OnlyBodyLy />}>          
            <Route path="/Form" element={<Form />} />                      
          </Route> 
          <Route element={<OnlyBodyLy />}>          
            <Route path="/ListForm" element={<ListForm />} />                      
          </Route>     
          <Route element={<BookMainLayout />}>          
            <Route path="/MyPage" element={<MyPage />}></Route>             
          </Route>                                                                      
      </Routes>
    )
  }
  
  export default CommonRouter