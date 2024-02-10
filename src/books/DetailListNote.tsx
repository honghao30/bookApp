import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { db } from '../../src/firebase';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

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

const DetailListNote: React.FC = () => {  
    const [noteList, setNoteList] = useState(null);
    const { bookId } = useParams();
    const location = useLocation();
    const { cates, index, code } = location.state;
    
    async function getNoteList() {    
      await getDocs(collection(db, code))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
          setNoteList(newData);         
          console.log('노트', newData)
      })     
    }

    useEffect(() => {
      getNoteList();
    },);

    if (!noteList) {
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
           <List>
            {noteList.map((note, index) => (
              <ListItem key={index}>                
                <Link to={`/ReadNoteDetail/${note.id}`} state={{ cates: note.subject, index: index, noteId: note.id,noteDb: note.noteCate }}>
                  {note.subject} {note.id}
                </Link>
              </ListItem>
            ))}            
          </List>
      </div>
    )
}

export default DetailListNote;
