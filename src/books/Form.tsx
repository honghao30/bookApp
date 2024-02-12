import * as React from 'react';
import { useEffect, useState } from 'react';
import MyBtn from '../components/ui_elements/MyBtn';
import { db, authService } from '../../src/firebase';
import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const FormMode: React.FC = () => {
    const [noteDetail, setNoteDetail] = useState(null);
    const navigate = useNavigate();
    
    const updateDoc = () => {
       console.log('updateDoc');
    }
    const onChange = (e) => {
        setNoteDetail(e.target.value);
    };
    
    const cancel = () => {
        navigate(-1);  
    }

    return (
        <div className='book-content'>
          <SubTitle>
            {cates}
          </SubTitle>      
          <BookContent>
                {/* {noteId, noteDetail.content}     */}
            <TextAreaWrap>
                <form onSubmit={ updateDoc }>              
                    <textarea
                    value={ noteDetail.content }
                    onChange={onChange}
                    ></textarea>
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
                        onClick={ cancel}
                    >취소</MyBtn>                 
                    </ButtonArea>              
                </form>
            </TextAreaWrap>
          </BookContent>                    
        </div>
      )
}
export default FormMode;