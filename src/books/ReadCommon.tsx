import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Loading from './compornents/Loading';
import BottomNav from "../layout/BottomNav"
import TopUtilDetail from "../layout/TopUtilDetail"
import GotoTop from './compornents/scrollTop';
import useScrollDirection from '../hook/scrollHook';

// ui
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { green } from '@mui/material/colors';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';

// fire base
import { db } from '../../src/firebase';
import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../src/firebase';

//edit
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { setDoc } from 'firebase/firestore/lite';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
}

const SubTitle = styled.div `
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
  padding-bottom: 30px;
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
const SubjectArea = styled.div `
  width: 100%;
  max-width: 1280px;  
  padding: 2px;
  font-weight: bold;
  margin-bottom: 10px;  
  label { 
    display: block;
    margin-bottom: 15px;  
  }
  input:not([type="checkbox"]) {
    border: 1px solid #ddd;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    width: 100%;
    text-indent: 10px;
  }
`
const BookContentDv = styled.div `
  height: 100%;
  padding: 70px 16px 16px;    
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
  const [url, SetUrl] = useState(null);  
  const [originUrl, SetOrigin] = useState(null);  
  const [fullBible, setFullBible] = useState(null);    
  const [audioUrl, setAudioUrl] = useState(null);
  const [showAddBible, setShowAddBible] = useState(Boolean);
  const location = useLocation();
  const { cates, bookId, bookCates, index, realVoice, onlyAudio, hasBible } = location.state;
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showBible, setShowBible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { scrollDirection, showGotoTop, currentScrollPosition } = useScrollDirection();  
  const [hasAudio, setHasAudio] = useState(false);
  const quillRef = useRef()

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
      },
    }
  }, [])

  //수정
  const [editMode, setEditMode] = useState(false);

  const getBookDetail = async () => {          
    const docRef = doc(db, bookId, id);      
    const docSnap = await getDoc(docRef);   
    console.log(docSnap) 
    if (docSnap.exists()) {
      setBook(docSnap.data())      
      console.log(docSnap.data())
    }      
    if (docSnap.data().url) {
      setHasAudio(true)
    }
  }
  const getFireData = async () => {    
    const docRef = doc(db, "originVoice", id);  
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setBook(docSnap.data())
    }  
    if (docSnap.data().url) {
      setHasAudio(true)
    }      
  }

  const modifayUpdate = async () => {
    console.log(realVoice, bookId, id)
    if(!realVoice) {
      try {
        const dbRef = doc(db, bookId, id);        
        await updateDoc(dbRef, book);
        setEditMode(false);
      } catch (error) {
        console.error('Error updating document: ', error);
      }   
    } else {
      try {
        const dbRef = doc(db, "originVoice", id);
        console.log('update', dbRef, id, book)    
        await updateDoc(dbRef, book);
        setEditMode(false);
      } catch (error) {
        console.error('Error updating document: ', error);
      }         
    }
  };

  useEffect(() => {
    console.log(hasBible)
    if (realVoice) {
      getFireData();
    } else {
      getBookDetail();
    }  
  }, []);

  if (!book) {
    return <div>
          <Loading />
    </div>;
  }

  return (
    <>  
      {scrollDirection !== 'down' && currentScrollPosition <= 200 && (
        <TopUtilDetail
          cates={cates}
          bookId={bookId}
          bookCates={bookCates}
          index={index}
          realVoice={realVoice}
          onlyAudio={onlyAudio}
          hasBible={hasBible}
          
        />
      )}
      <BookContentDv>      
        <SubTitle>
          {bookCates}
        </SubTitle>
        {showGotoTop &&
          <GotoTop />
        } 

        {realVoice && book.url !== undefined && book.url !== '' && (
          <>
            {editMode ? (
              <SubjectArea>
                  <label htmlFor='title'>URL</label>
                  <p><input name="url" type="text" placeholder="url"  value={book.url} 
                  onChange={(e) => SetUrl({...book, url: e.target.value })}                   
                  /></p>
              </SubjectArea>                
              ) : (
                <div className='youtube-wrap'>
                    <iframe src={`https://www.youtube.com/embed/${book.url}`} title={book.subject}></iframe>
                </div>                
            )}
          </>
        )}

        {!realVoice && book.url !== undefined && book.url !== '' && (
          <>
            {editMode ? (
              <SubjectArea>
                  <label htmlFor='title'>오디오 링크</label>
                  <p>
                  <input 
                      name="audioUrl" 
                      type="text" 
                      placeholder="url" 
                      value={book.url || ''} 
                      onChange={(e) => setBook({ ...book, url: e.target.value })} 
                  />
                  </p>
              </SubjectArea>              
            ) : (
              <AudioSection>
                <iframe src={`https://player.audiop.naver.com/player?cpId=audioclip&cpMetaId=${book.url}&partnerKey=f8ae3b53&partnerId=audioclip&extra=`} title="오디오 플레이어" width="100%" height="60px"></iframe>
              </AudioSection>
            )}
          </>
        )}

        {editMode ? (
          <BookContent>
            <TextAreaWrap>                
              <ReactQuill
                style={{ width: "100%", height: "550px", overflow: "auto" }}
                placeholder=""
                theme="snow"
                ref={quillRef}
                value={book.content || ''}
                onChange={(content) => setBook({ ...book, content })}
                modules={modules}
              />                            
            </TextAreaWrap>            
          </BookContent>
        ) : (                      
            <BookContent dangerouslySetInnerHTML={{ __html: book.content }} />          
        )}

        {editMode && hasBible ? (
          <BookContent>            
            <TextAreaWrap>                
              <ReactQuill
                style={{ width: "100%", height: "550px", overflow: "auto" }}
                placeholder=""
                theme="snow"
                ref={quillRef}
                value={book.fullBible || ''}
                onChange={(fullBible) => setBook({ ...book, fullBible })}                
                modules={modules}
              />                            
            </TextAreaWrap>          
          </BookContent>          
        ) : (
          showBible && <BookContent dangerouslySetInnerHTML={{ __html: book.fullBible }} />
        )}

        {!editMode && (
          <ButtonArea>
            <Stack direction="row">  
              {book.fullBible &&          
                <Button variant="outlined" onClick={() => setShowBible(prev => !prev)}>
                  {showBible ? '성경구절 감추기' : '성경구절 보기'}
                </Button>         
              }                   
              <Button variant="outlined" onClick={() => setEditMode(true)}>수정</Button>                                               
            </Stack>
          </ButtonArea>
        )}
        <ButtonArea>
          <Stack direction="row">          
            {editMode && (
              <>
                <Button variant="outlined" onClick={ modifayUpdate }>저장</Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>취소</Button>              
              </>
            )}
          </Stack>
        </ButtonArea>        
      </BookContentDv>  
      {scrollDirection !== 'down' && currentScrollPosition <= 200 && <BottomNav 
        onlyAudio={onlyAudio}
        hasAudio={hasAudio}
      />  }
    </>

  )
}

export default ReadCommon;
