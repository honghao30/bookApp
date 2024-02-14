import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Loading from './compornents/Loading';
import { db } from '../../src/firebase';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Button, Stack } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../src/firebase';

const List = styled.ul `
  display: block;
`;
const ListItem = styled.li `
  font-size: 15px;
  padding: 6px 0;
`
const SubTitle = styled.p `
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  margin-bottom: 20px;
`

const DetailListAudio: React.FC = () => {  
    const [audioBook, setAudioBook] = useState(null);
    const { bookId } = useParams();
    const location = useLocation();
    const { cates, index } = location.state;   

    const getBookList = async () => {    
      await getDocs(collection(db, bookId))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
          setAudioBook(newData);         
          console.log('노트', newData)
      })     
    }

    useEffect(() => {
      getBookList();
    }, []);

    if (!audioBook) {
      return <div>
           <Loading />
      </div>;      
    }

    return (
      <div className='book-content'>
        <SubTitle>
          {cates}
        </SubTitle>
           <List>
            {audioBook.map((book, index) => (
              <ListItem key={index}>
                  {/* {book.title}       */}
                  <div>                    
                  <iframe 
                    src={`https://player.audiop.naver.com/player?cpId=audioclip&cpMetaId=${book.url}&partnerKey=f8ae3b53&partnerId=audioclip&extra=`} 
                    title="오디오 플레이어" 
                    width="100%" 
                    height="100px">
                </iframe>                    
                  </div>          
              </ListItem>
            ))}            
          </List>
      </div>
    )
}

export default DetailListAudio;
