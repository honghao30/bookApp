import React from 'react'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
// import { authService } from "./firebase";

import './assets/scss/index.scss'
import CommonRouter  from './router/CommonRouter'
import axios from 'axios'

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/db/list.json');
      const data = response.data;      
      localStorage.setItem('list', JSON.stringify(data));
    };
    fetchData();
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
