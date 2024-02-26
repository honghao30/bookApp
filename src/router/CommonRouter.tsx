import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'

// 레이아웃
import Intro from '../pages/Intro'
import Form from '../books/Form'
import ListForm from '../books/ListForm'
import ReadForm from '../books/ReadForm'
import OnlyBodyLy from '../layout/onlyBodyLy'
import BookMainLayout from '../layout/BookMainLayout'

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
          <Route element={<OnlyBodyLy />}>          
            <Route path="/ReadForm" element={<ReadForm />} />                      
          </Route>                                                           
      </Routes>
    )
  }
  
  export default CommonRouter