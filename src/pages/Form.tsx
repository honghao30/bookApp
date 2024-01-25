import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MyInput from '../components/_form/_input';
import MyTextArea from '../components/_form/_textArea';
import MyBtn from '../components/ui_elements/MyBtn';
import Loading from '../components/ui_elements/Loading';
import { isKor } from '../utils/validation';
import { getTodayDate } from '../utils/common';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, isLoggedInState } from '../recoil/authAtom';
import axios from 'axios';

const Post: React.FC = () => {
    const [youtubeLink, setYoutubeLink] = useState('')
    const [imgLink, setImgLink] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    const [mediaMessage, setMediaMessage] = useState({ error: false, errorMsg: '' })
    const [mediaMessage1, setMediaMessage1] = useState({ error: false, errorMsg: '' })
    const [mediaMessage2, setMediaMessage2] = useState({ error: false, errorMsg: '' })    
    const [descriptionMessage, setdescriptionMessage] = useState({ error: false, errorMsg: '' })
    const [isLoading, setIsLoading] = useState(false)

    const user = useRecoilValue(userState);    
    const [userInfo, setUserInfo] = useState(null);    
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const navigate = useNavigate();

    // 유효성 검사
    const handleValidation = (event: { target: {
        focus: any; value: unknown; 
        }; }) => {       
        const { name, value } = event.currentTarget;
        if (!value) {
            if (name === 'description') {
                setdescriptionMessage({ error: true, errorMsg: `${name}를 입력하지 않으셨네요!` });
                event.target.focus();
            }
            return false;
        }
        if (name === 'youtubeLink' && isKor(value)) {
            setMediaMessage1({ error: true, errorMsg: `정확한 ${name}을 입력하세요.` }); 
        } else {
            setMediaMessage1({ error: false, errorMsg: '' });
        }  
        if (name === 'imgLink' && isKor(value)) {
            setMediaMessage2({ error: true, errorMsg: `정확한 ${name}을 입력하세요.` }); 
        } else {
            setMediaMessage2({ error: false, errorMsg: '' });
        }              
    }


    const handlePost  = ( event: { preventDefault: () => void; } ) => {      
        event.preventDefault()          
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);                
          setUserInfo(userInfo);
          setIsLoggedIn(true);
          const newPost = {
            greatAt: getTodayDate("yy-mm-dd hh:mm:ss"),
            youtubeLink: youtubeLink,
            imgLink: imgLink,
            description: description,
            wriName: userInfo.user,
            profile: userInfo.profile,
            like: 0,
            command: 0,
            addFever: 0,
            share: 0
          }
          console.log(newPost)     
          const addPostItem = async () => {
            const response = await axios.post("https://shell-power-umbrella.glitch.me/posts", newPost);    
            console.log(response)                    
            navigate('/Main');
          };
          addPostItem();     
        } else {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/');
        }       
        
    }



    return (
        <div className="full__wrap">                  
            <div className="post-upload-form">
                <div className="tab__wrap">
                    <ul className="tab-list">
                        <li className="active">
                            <button type="button" className="btn btn-text-default">                    
                                <span>Pick 등록</span>
                            </button>                               
                        </li>
                        <li>
                            <button type="button" className="btn btn-text-default">                    
                                <span>메모 등록</span>
                            </button>                             
                        </li>
                    </ul>                             
                </div>
                <form onSubmit={ handlePost }>
                    <ul className="upload-form">
                        <li>
                            <div className="preview">
                                    { youtubeLink &&
                                        <iframe className="youtube-iframe" src="https://www.youtube.com/embed/374RzUzQ7gc" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                                        </iframe>
                                    }
                                    { imgLink &&
                                         <img src={imgLink} alt='' onError={() => alert('이미지를 로드할 수 없습니다.')}  />
                                    }                                    
                            </div>
                        </li>                          
                        <li>
                            <MyInput
                                inputProps={{
                                    label: "유튜브 링크",
                                    type: 'text',                                
                                    name: 'youtubeLink',
                                    value: youtubeLink,
                                    maxLength: 20,
                                    placeholder: "Youtube Link",   
                                    title: "Please enter Youtube Link",   
                                    message: mediaMessage1,  
                                    onChange: (e) => setYoutubeLink(e.target.value),    
                                    onBlur: handleValidation                                                
                                }} 
                            /> 
                        </li>      
                        <li>
                            <MyInput
                                inputProps={{
                                    label: "이미지 링크",
                                    type: 'text',                                
                                    name: 'imgLink',
                                    value: imgLink,
                                    maxLength: 1000,
                                    placeholder: "Images Link",   
                                    title: "Please enter Images Link",   
                                    message: mediaMessage2,  
                                    onChange: (e) => setImgLink(e.target.value),    
                                    onBlur: handleValidation                                                
                                }} 
                            /> 
                            <p><a href="https://www.shorturl.at/shortener.php" target='_blank'>짧은 주소로 올리기</a></p>
                        </li>                                                                  
                        <li>
                            <MyInput
                                inputProps={{
                                    label: "Image Upload",
                                    type: "file",                                
                                    name: 'image',
                                    value: image,                                    
                                    placeholder: "image Upload",   
                                    title: "Please Choice Images",                                       
                                    onBlur: handleValidation ,       
                                    innerBtnProps: {
                                        innerButton: true,
                                        buttonName: "확인",
                                        buttonOption: {
                                            type: 'button',                                                                                
                                            btnColor: 'btn-primary-line',                                        
                                            btnSize: 'medium'                                            
                                        }                                    
                                    },                
                                    onChange: (e) => setImage(e.target.value)                                                                 
                                }}
                                // onButtonClick={ passwordVisibleHandler } 
                            />                              
                        </li>                    
                        <li>
                            <MyTextArea
                                TextAreaProps={{
                                    label: "설명",                                                             
                                    name: 'description',
                                    value: description,
                                    maxLength: 20,
                                    placeholder: "description",   
                                    title: "Please enter description",   
                                    message: descriptionMessage,  
                                    onChange: (e) => setDescription(e.target.value),    
                                    onBlur: handleValidation                                                
                                }} 
                            /> 
                        </li>
                        {/* <li>
                            <div className="form-input__wrap  user-title">
                                <label htmlFor="userId">태그</label>
                                <div className="form-input">
                                    <span className='input'><input type="text" placeholder="Tag" /></span>
                                </div>
                            </div>
                        </li>                                                                                                */}
                    </ul>
                    <div className="button__wrap">
                        <MyBtn
                            type='submit'                            
                            btnColor={'btn-primary'}
                            btnSize={'medium'}    
                            disabled={!(description && (youtubeLink || imgLink || image))}           
                        >
                            등록
                        </MyBtn>
                        <MyBtn
                            type='button'                            
                            btnColor={'btn-secondary'}
                            btnSize={'medium'}                        
                        >
                            취소
                        </MyBtn> 
                    </div>                     
                </form>   
                {isLoading && <Loading />}
            </div>  
        </div>
    );
};

export default Post;