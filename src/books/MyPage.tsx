import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from './compornents/avata';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import MyBtn from '../components/ui_elements/MyBtn';

// fire base
import { db } from '../firebase';
import { collection, getDocs, query, orderBy} from "firebase/firestore";

const ProfileBox = styled.div `
  font-size: 18px;
  line-height:28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50px 0;
  gap: 15px;
`

const MyPage: React.FC = () => {

    useEffect(() => {
    }, []);


    return (
      <div className='book-content'>
        <ProfileBox>
          <Avatar />
          <p>홍길동님</p>
          <MyBtn       
            type='button'                     
            iconOnly={false}
            btnColor={'btn-primary'}
            btnSize={'medium'}
          >프로필 수정</MyBtn>                
        </ProfileBox>       
        <Divider />     
      </div>
    )
}

export default MyPage
