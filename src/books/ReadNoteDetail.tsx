import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { db } from '../../src/firebase';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const SubTitle = styled.p `
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  margin-bottom: 20px;
`
const BookContent = styled.div `
  font-size: 18px;
  line-height:28px;
  margin-bottom: 10px;
  padding-bottom: 70px;
`
const ButtonArea = styled.div `
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ReadNoteDetail: React.FC = () => {  
  const [noteDetail, setNoteDetail] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const { cates, noteId, index, noteDb } = location.state;

  useEffect(() => {
    const fetchNote = async () => {   
      const docRef = doc(db, noteDb, noteId);  
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        setNoteDetail(docSnap.data())
      }       
    };
    fetchNote();
  });

  if (!noteDetail) {
    return <div>
          <Box sx={{ width: '100%', height: '200px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <CircularProgress />
          </Box>
    </div>;
  }

  return (
    <div className='book-content'>
      <SubTitle>
        {cates}
      </SubTitle>      
      <BookContent dangerouslySetInnerHTML={{ __html: noteDetail.content }} /> 
      <ButtonArea>
        <Stack direction="row">
          <Button variant="outlined">성경구절 전체보기</Button>
        </Stack>
      </ButtonArea>     
      <BookContent></BookContent> 
    </div>
  )
}

export default ReadNoteDetail;
