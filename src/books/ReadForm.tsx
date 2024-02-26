import * as React from 'react';
import { useState, useRef, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyBtn from '../components/ui_elements/MyBtn';
import styled from 'styled-components';

//firebase
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SubTitle = styled.p `
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  margin-bottom: 20px;
`
const BookContent = styled.div `
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 5px;
  padding-bottom: 10px;
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

const ReadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    writer: '운영자',
    subject: '',
    originUrl: '',
    bookCont: ''
  });
  const [isCheck, setIsCheck] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [fullBible, setFullBible] = useState('');
  const location = useLocation();
  const { bookId, id, db } = location.state || {};
  const quillRef = useRef();
  const navigate = useNavigate();

  // const fetchBook = async () => {
  //   console.log('책 호출', bookId, id);
  //   const docRef = doc(db, bookId, id);  
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     setFormData(docSnap.data())
  //   }       
  //   // const docRef = doc(db, bookId, id);        
  //   // const docSnap = await getDoc(docRef);    
  //   // if (docSnap.exists()) {
  //   //   const data = docSnap.data();
  //   //   setFormData(data);
  //   //   setIsCheck(data.isCheck || false);
  //   //   setAudioUrl(data.audioUrl || '');
  //   //   setFullBible(data.fullBible || '');
  //   // }          
  // }

  useEffect(() => {
    console.log('호출정보', db, bookId, id)
    const fetchBook = async () => {   
      const docRef = doc(db, bookId, id);  
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        console.log(docRef);
      }       
    };    
    fetchBook()
  }, []);

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

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, subject: e.target.value });
  };
  
  const handleOriginUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, originUrl: e.target.value });
  };
  
  const handleIsCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked);
  };  

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioUrl(e.target.value);
  };

  const handleBookContentChange = (content: string) => {
    setFormData({ ...formData, bookCont: content });
  }

  const handleFullBibleChange = (content: string) => {
    setFullBible(content);
  };
  
  const updateDocument = async () => {
    // const docRef = doc(db, bookId, id);
    // await updateDoc(docRef, formData);
    navigate(-1);
  }

  const cancel = () => {
    navigate(-1);  
  }

  return (
    <div className='book-content'>
      <form onSubmit={updateDocument}>      
        <SubTitle>
          수정하기 화면
        </SubTitle>      
        <SubjectArea>
            <label htmlFor='title'>작성자</label>
            <p><input name="writer" type="text" placeholder="운영자" readOnly value={formData.writer} /></p>
        </SubjectArea>            
        <SubjectArea>
            <label htmlFor='title'>제목</label>
            <p><input name="subject" type="text" placeholder="subject" value={formData.subject} onChange={handleSubjectChange} /></p>
        </SubjectArea>   
        <SubjectArea>
            <label htmlFor='title'>원본 링크</label>
            <p><input name="originUrl" type="text" placeholder="originUrl" value={formData.originUrl} onChange={handleOriginUrlChange} /></p>
        </SubjectArea>     
        {db && 
        <>
          <SubjectArea>
              <label htmlFor='title'>오디오 북 유무</label>
              <p>
                <input type="checkbox"
                  value="isCheck"                  
                  name={'isCheck'}
                  checked={isCheck}
                  onChange={handleIsCheckChange}    
                />
              </p>
          </SubjectArea>
          <SubjectArea>
              <label htmlFor='title'>오디오 링크</label>
              <p><input name="audioUrl" type="text" placeholder="url" value={audioUrl} onChange={handleAudioChange} /></p>
          </SubjectArea>
        </>               
        }  
        <BookContent>    
          <TextAreaWrap>                
            <ReactQuill
              style={{ width: "100%", height: "550px", overflow: "auto" }}
              placeholder=""
              theme="snow"
              ref={quillRef}
              value={formData.bookCont}
              onChange={handleBookContentChange} // Pass the content directly
              modules={modules}
            />                            
          </TextAreaWrap>
        </BookContent> 
        <ButtonArea>
          <MyBtn
              type="submit"                      
              iconOnly={false}
              btnColor={'btn-primary'}
              btnSize={'medium'}
          >저장</MyBtn> 
          <MyBtn
              type="button"                      
              iconOnly={false}
              btnColor={'btn-secondary'}
              btnSize={'medium'}
              onClick={cancel}
          >취소</MyBtn>                 
        </ButtonArea>     
      </form>                      
    </div>
  )
}
export default ReadForm;
