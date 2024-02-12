import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import { db } from '../../src/firebase';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../src/firebase';

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
  gap: 5px;
  .MuiStack-root {
    gap: 5px;
  }
`
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReadNoteDetail: React.FC = () => {  
  const [noteDetail, setNoteDetail] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const { cates, noteId, index, noteDb } = location.state;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = React.useState(false);

  const modifyNote = (id, content) => {    
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchNote = async () => {   
      const docRef = doc(db, noteDb, noteId);  
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        setNoteDetail(docSnap.data())
      }       
    };
    fetchNote();
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        // 로그인 된 상태일 경우
        setIsLoggedIn(true);               
        if (user.email === "ncpcog@gmail.com") {
          setIsAdmin(true);
          console.log('admin');
        }
      } else {
        // 로그아웃 된 상태일 경우
        setIsLoggedIn(false);
      }
    });       
  },[]);

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
            {isAdmin && <Button variant="outlined">성경구절 전체보기</Button>}
            {isAdmin && <Button variant="outlined">성경구절 추가하기</Button>}               
            {isAdmin && <Button variant="outlined" onClick={() => modifyNote(noteId, noteDetail.content)}>본문 수정하기</Button>}               
        </Stack>
      </ButtonArea>     
      <BookContent></BookContent> 
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <BookContent>
          {noteId, noteDetail.content}    
        </BookContent> 
      </Dialog>      
    </div>
  )
}

export default ReadNoteDetail;
