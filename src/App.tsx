import React from 'react'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
// import { authService } from "./firebase";

import './assets/scss/index.scss'
import CommonRouter  from './router/CommonRouter'

function App() {
  useEffect(() => {
    
    
  });  
  return (
    <div className='wrap'>
      <RecoilRoot>
        <CommonRouter />
      </RecoilRoot>      
    </div>
  )
}

export default App
