import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Loading from './compornents/Loading';
import BottomNav from "../layout/BottomNav"
// import TopUtilDetail from "../layout/TopUtilDetail"

// ui
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { green } from '@mui/material/colors';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Stack } from '@mui/material';

// fire base
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
const fabStyle = {
  position: 'fixed',
  bottom: 56,
  right: 16,
};
const AudioSection = styled.div`
  padding: 30px 0;
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
const ReadCommon: React.FC = () => {  
  const [book, setBook] = useState(null);
  const [value, setValue] = useState(0);
  const location = useLocation();
  const { bookId, cates, index, realVoice, onlyAudio } = location.state;
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { id } = useParams();

  const fabs = [
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <KeyboardArrowUpIcon />,
      label: '위로',
    }
  ];

  const getBookDetail = async () => {       
    const docRef = doc(db, bookId, id);  
    const docSnap = await getDoc(docRef);    
    if (docSnap.exists()) {
      setBook(docSnap.data())
    }      
  }
  const getFireData = async () => {    
    const docRef = doc(db, "originVoice", id);  
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setBook(docSnap.data())
    }    
  }

  const editPost = () => {
    console.log('수정')
  }

  useEffect(() => {
    if (realVoice) {
        getFireData();
      } else {
        getBookDetail();
      }    
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
          setShowTopBtn(true);
      } else {
          setShowTopBtn(false);
      }
  });     
  }, []);

  const goToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  };

  if (!book) {
    return <div>
          <Loading />
    </div>;
  }

  return (
    <>      
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

        {realVoice && book.url !== undefined && book.url !== '' && (
        <div className='youtube-wrap'>
            <iframe src={`https://www.youtube.com/embed/${book.url}`} title={book.subject}></iframe>
        </div>
        )}

        {!realVoice && book.url !== undefined && book.url !== '' && (
        <AudioSection>
            <iframe src={`https://player.audiop.naver.com/player?cpId=audioclip&cpMetaId=${book.url}&partnerKey=f8ae3b53&partnerId=audioclip&extra=`} title="오디오 플레이어" width="100%" height="60px"></iframe>
        </AudioSection>
        )}
       <BookContent dangerouslySetInnerHTML={{ __html: book.content }} />  
       <ButtonArea>
          <Stack direction="row">          
            <Button variant="outlined" onClick={ editPost }>수정</Button>                                               
          </Stack>
        </ButtonArea>            
      </div>   
      <BottomNav />  
    </> 
  )
}

export default ReadCommon;
