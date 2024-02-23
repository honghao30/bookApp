import * as React from 'react';
import { useState, useRef, useMemo } from 'react';
import MyBtn from '../components/ui_elements/MyBtn';
import styled from 'styled-components';
import MyCheck from '../components/_form/_checkbox';

//edit
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"

//ui
import { Checkbox } from '@mui/material';

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

const Form: React.FC = () => {
    const [bookCont, setBookCont] = useState(null);
    const [subject, setSubject] = useState(null);
    const [url, SetUrl] = useState(null);
    const [isCheck, setIsCheck] = useState(false);
    const [originUrl, SetOrigin] = useState(null);
    const [fullBible, SetFullBible] = useState(null);
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

    const handleSubjectChange = (e) => {
      setSubject(e.target.value);
    };
    
    const handleUrlChange = (e) => {
      SetUr(e.target.value);
    };
    
    const handleOriginUrlChange = (e) => {
      SetOrigin(e.target.value);
    };
    
    const handleIsCheckChange = (e) => {
      setIsCheck(e.target.checked);
    };  
  
    const handleAudioChange = (e) => {
      SetUrl(e.target.checked);
    };

    const handleBookContentChange = (content) => {
      setBookCont(content);
    }

    const handleFullBibleChange = (content) => {
      SetFullBible(content);
    };
    
    const updateDoc = () => {
       console.log('updateDoc');
    }
    
    const cancel = () => {
        navigate(-1);  
    }

    return (
        <div className='book-content'>
          <SubTitle>
            {/* {cates} */}
          </SubTitle>      
          <SubjectArea>
              <label htmlFor='title'>제목</label>
              <p><input name="subject" type="text" placeholder="subject" value={subject || ''} onChange={handleSubjectChange} /></p>
          </SubjectArea>     
          <SubjectArea>
              <label htmlFor='title'>URL</label>
              <p><input name="url" type="text" placeholder="url"  value={url || ''} onChange={handleUrlChange} /></p>
          </SubjectArea>    
          <SubjectArea>
              <label htmlFor='title'>원본 링크</label>
              <p><input name="originUrl" type="text" placeholder="originUrl" value={originUrl || ''} onChange={handleOriginUrlChange} /></p>
          </SubjectArea>                    
          <SubjectArea>
              <label htmlFor='title'>오디오 북 유무</label>
              <p>
                <MyCheck
                  label="있음"
                  value="isCheck"                  
                  name={'isCheck'}
                  checked={isCheck}
                  onChange={handleIsCheckChange}                       
                />                
              </p>
          </SubjectArea>  
          <SubjectArea>
              <label htmlFor='title'>오디오 링크</label>
              <p><input name="url" type="text" placeholder="url" required value={url} onChange={handleAudioChange} /></p>
          </SubjectArea>                         
          <BookContent>    
            <TextAreaWrap>
                <form onSubmit={ updateDoc }>              
                <ReactQuill
                  style={{ width: "100%", height: "550px", overflow: "auto" }}
                  placeholder=""
                  theme="snow"
                  ref={quillRef}
                  value={bookCont || ''}
                  onChange={handleBookContentChange} // Pass the content directly
                  modules={modules}
                />                   
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
                        onClick={ cancel}
                    >취소</MyBtn>                 
                    </ButtonArea>              
                </form>
            </TextAreaWrap>
          </BookContent> 
          <BookContent>    
            <TextAreaWrap>
                <form onSubmit={ updateDoc }>              
                <ReactQuill
                  style={{ width: "100%", height: "550px", overflow: "auto" }}
                  placeholder=""
                  theme="snow"
                  ref={quillRef}
                  value={fullBible || ''}
                  onChange={handleFullBibleChange}
                  modules={modules}
                />                   
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
                        onClick={ cancel}
                    >취소</MyBtn>                 
                    </ButtonArea>              
                </form>
            </TextAreaWrap>
          </BookContent>                               
        </div>
      )
}
export default Form;