import * as React from 'react';
import { useEffect, useRef, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { green } from '@mui/material/colors';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import BottomNav from "../layout/BottomNav"
import TopUtilDetail from "../layout/TopUtilDetail"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
const ButtonArea = styled.div `
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const fabStyle = {
  position: 'fixed',
  bottom: 56,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

const ReadTapeDetail: React.FC = () => {  
  const [tape, setTape] = useState(null);
  const { typeId } = useParams();
  const location = useLocation();
  const { cates, index, bookId } = location.state;
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const [editing, setEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const quillRef = useRef()
  
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

  const fabs = [
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <KeyboardArrowUpIcon />,
      label: '위로',
    }
  ];

  async function getFireData() {    
    const docRef = doc(db, "originVoice", bookId);  
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setTape(docSnap.data())
    }    
  }
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const isModifyTape = (e) => {
    e.preventDefault();
    const dbRef = doc(db, "originVoice", bookId);
    console.log('update', dbRef, bookId)    
    setEditing(false);
  }

  useEffect(() => {   
    getFireData();
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    });  
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
  }, []);

  const goToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  };
  if (!tape) {
    return <div>
          <Box sx={{ width: '100%', height: '200px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <CircularProgress />
          </Box>
    </div>;
  }
  return (
    <>    
      <TopUtilDetail book={ "육성설교"} />
      <div className='book-content'>      
        <SubTitle>
          {cates}
        </SubTitle>
        {showTopBtn && fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === index}
          >
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} size="medium" onClick={goToTop}>
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
        {editing ? (
          <form onSubmit={ isModifyTape }>
            <ReactQuill
                style={{ width: "100%", height: "550px" }}
                placeholder=""
                theme="snow"
                ref={quillRef}
                value={tape.content}
                onChange={(content) => setTape({ ...tape, content })}
                modules={modules}
              />      
            <ButtonArea>
              <Stack direction="row">          
                  {isAdmin && <Button variant="outlined" type="submit">저장</Button>}
                  {isAdmin && <Button variant="outlined" onClick={toggleEditing}>취소</Button>}                                
              </Stack>
            </ButtonArea> 
          </form>  
          ) : ( 
          <>
            <div className='youtube-wrap'>
            <iframe src={`https://www.youtube.com/embed/${tape.url}`} title={ tape.subject }></iframe>
            </div>
            <BookContent dangerouslySetInnerHTML={{ __html: tape.content }} /> 
            <ButtonArea>
              <Stack direction="row">
                <Button variant="outlined" onClick={toggleEditing}>수정하기</Button>
              </Stack>
            </ButtonArea> 
          </> 
        )}                   
      </div>
      <BottomNav />  
    </>
  )
}

export default ReadTapeDetail;
