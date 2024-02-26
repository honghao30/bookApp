import * as React from 'react';
import { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import MyBtn from '../components/ui_elements/MyBtn';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import { db } from '../../src/firebase';
import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../src/firebase';
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"

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
const TextAreaWrap = styled.div `
  width: 100%;
  max-width: 1280px;  
  padding: 2px;
  border: 1px solid #ddd;
  margin: 20px auto;
  textarea {
    width: 100%;
    height: 500px;
    border: 0;
    font-size: 16px;
  }
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
  const [openFull, setOpenFull] = React.useState(false);  
  const quillRef = useRef()
  const [content, setContent] = useState("")
  const [showForm, setShowForm] = useState(false);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
      },
    }
  }, [])

  const addFullNote = (id, content) => {    
    setOpen(true);
  }

  const editNote = (id, content) => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setNewNoteDetail(e.target.value);
  };  
  const updateNote = async (e) => {    
    e.preventDefault();
    const dbRef = doc(db, `${noteDb}`, id)
    console.log('update', dbRef, noteDetail)
    await updateDoc(dbRef, {
      content: noteDetail.content
    });    
    setOpen(false);
  };
  const showFullBible = () => {
    setOpenFull(prevOpenFull => !prevOpenFull);
  }
  useEffect(() => {
    const fetchNote = async () => {   
      const docRef = doc(db, noteDb, noteId);  
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        // setNoteDetail(docSnap.data())
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
            {isAdmin && <Button variant="outlined" onClick={() => { showFullBible(); setShowForm(false); }}>성경구절 전체보기</Button>}
            {isAdmin && <Button variant="outlined" onClick={() => { showFullBible(); setShowForm(true); }}>성경구절 추가하기</Button>}  
            {isAdmin && <Button variant="outlined" onClick={() => editNote(noteId, noteDetail.content)}>본문 수정하기</Button>}               
        </Stack>
      </ButtonArea>     
      {openFull && 
      <BookContent>
        <div dangerouslySetInnerHTML={{ __html: noteDetail.fullBible }} />
        {showForm && 
        <form>
          <ReactQuill
              style={{ width: "100%", height: "550px" }}
              placeholder=""
              theme="snow"
              ref={quillRef}
              value={noteDetail.fullBible}
              onChange={(fullBible) => setNoteDetail({ ...noteDetail, fullBible })}
              modules={modules}
            />      
          <ButtonArea>
            <Stack direction="row">          
                {isAdmin && <Button variant="outlined">저장</Button>}
                {isAdmin && <Button variant="outlined">취소</Button>}                                
            </Stack>
          </ButtonArea> 
        </form>    
        }               
      </BookContent>
      }
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
              수정
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              저장
            </Button> */}
          </Toolbar>
        </AppBar>
        <BookContent>
          {/* {noteId, noteDetail.content}     */}
          <TextAreaWrap>
            <form onSubmit={ updateNote }>              
              {/* <textarea
                value={ noteDetail.content }
                onChange={(e) => setNoteDetail({ ...noteDetail, content: e.target.value })}
              ></textarea> */}
              <ReactQuill
                style={{ width: "100%", height: "550px" }}
                placeholder=""
                theme="snow"
                ref={quillRef}
                value={noteDetail.content}
                onChange={(content) => setNoteDetail({ ...noteDetail, content })}
                modules={modules}
              />              
              <ButtonArea>
                <MyBtn
                  type="submit"                      
                  iconOnly={false}
                  btnColor={'btn-primary'}
                  btnSize={'medium'}                  
                >수정</MyBtn> 
                <MyBtn
                  type="button"                      
                  iconOnly={false}
                  btnColor={'btn-secondary'}
                  btnSize={'medium'}
                  onClick={handleClose}
                >취소</MyBtn>                 
              </ButtonArea>              
            </form>
          </TextAreaWrap>
        </BookContent> 
      </Dialog>      
    </div>
  )
}

export default ReadNoteDetail;
