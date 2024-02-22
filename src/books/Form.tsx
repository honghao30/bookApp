import * as React from 'react';
import { useEffect, useState, useRef, useMemo } from 'react';
import MyBtn from '../components/ui_elements/MyBtn';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

//edit
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"

//fire base
// import { db, authService } from '../../src/firebase';
// import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
// import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

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

const Form: React.FC = () => {
    const [content, setContent] = useState({});
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const quillRef = useRef()

    const { typeId } = useParams();
    const location = useLocation();
    // const { cates, index, bookId } = location.state;

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


    const updateDoc = () => {
       console.log('updateDoc');
    }
    const onChange = (e) => {
      setContent(e.target.value);
    };
    
    const cancel = () => {
        navigate(-1);  
    }

  function setTape(arg0: any): void {
    throw new Error('Function not implemented.');
  }

    return (
        <div className='book-content'>
          <SubTitle>
            {/* {cates} */}
          </SubTitle>      
          <BookContent>                
            <TextAreaWrap>
                <form onSubmit={ updateDoc }>              
                <ReactQuill
                  style={{ width: "100%", height: "550px" }}
                  placeholder=""
                  theme="snow"
                  ref={quillRef}
                  value={ content }
                  onChange={(content) => setTape({ ...content, content })}
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