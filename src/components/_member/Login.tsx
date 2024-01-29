import React, { ChangeEvent, MouseEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MyInput from '../_form/_input';
import MyBtn from '../ui_elements/MyBtn';
import { isEmail, passwordValidator} from '../../utils/validation';
import Loading from '../ui_elements/Loading';
import { userState, isLoggedInState, login } from "../../recoil/authAtom";
import { useSetRecoilState } from 'recoil';
import DDayCount from '../../books/compornents/dday'

// 로그인 페이지 유효성검사 hook 작업
// json 연결
// sns 연결
// https://rhgustmfrh.tistory.com/56

const LoginForm: React.FC  = () => {    
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('');    
    const [activeClass, setActiveClass] = useState('');    
    const [inputType, setInputType] = useState('password');
    const [emailMessage, setEmailMessage] = useState({ error: false, errorMsg: '' })
    const [passwordMessage, setPasswordMessage] = useState({ error: false, errorMsg: '' })
    const [isLoading, setIsLoading] = useState(false)

    const setUser = useSetRecoilState(userState);
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const navigate = useNavigate();

    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const formData = {
          email: email,
          password: password,
        };
        try {          
          const loggedInUser = await login(formData);
          setUser(loggedInUser);
          setIsLoggedIn(true);                    
          navigate("/Main")  
        } catch (error) {
          console.error(error); // 이 부분은 에러처리를 원하는 방식으로 변경하실 수 있습니다.
        }
        // setIsLoading(true)
      };
      

    // 유효성 검사
    const handleValidation = (event: { target: {
        focus: any; value: unknown; 
        }; }) => {       
        const { name, value } = event.currentTarget;
        if (!value) {
            if (name === 'email') {
                setEmailMessage({ error: true, errorMsg: `${name}를 입력하지 않으셨네요!` });
            } else if (name === 'password') {
                setPasswordMessage({ error: true, errorMsg: `${name}를 입력하지 않으셨네요!` });
            }
            event.target.focus();
            return false;
        }         
        
        if (name === 'email' && !isEmail(value)) {
            setEmailMessage({ error: true, errorMsg: `정확한 ${name}을 입력하세요.` }); 
        } else {
            setEmailMessage({ error: false, errorMsg: '' });
        }  
        if (name === 'password' && !passwordValidator(value)) {
            setPasswordMessage({ error: true, errorMsg: `정확한 ${name}를 입력하세요. ` }); 
        } else {
            setPasswordMessage({ error: false, errorMsg: '' });
        }          
    }

    // 비밀번호 show hide
    const passwordVisibleHandler = () => {        
        if (inputType === 'password') {
            setInputType('text');
            setActiveClass('icon-eye-show');
        } else {
            setInputType('password');
            setActiveClass('');
        }
    }

    return (
        <div className="login__form">
            <div className='sns__login'>
                <MyBtn
                    type='button'
                    iconOnly={ true}
                    btnColor={'btn-icon-only'}
                    iconName={'icon-naver'} 
                >
                    <span className="ir-text">네이버</span>
                </MyBtn>  
                <MyBtn
                    type='button'
                    iconOnly={ true}
                    btnColor={'btn-icon-only'}
                    iconName={'icon-kakao'} 
                >
                    <span className="ir-text">카카오</span>
                </MyBtn> 
                <MyBtn
                    type='button'
                    iconOnly={ true}
                    btnColor={'btn-icon-only'}
                    iconName={'icon-google'} 
                >
                    <span className="ir-text">구글</span>
                </MyBtn>               
            </div>
            <div className='sign-guide__wrap'>                
                <Link to="/bookMain">Please Login</Link>
            </div>
            <DDayCount />
            <div className='manage__info'>                
                <Link to="http://www.ncpcog.co.kr" target='_blank'>Contact to Manage?</Link> 
            </div>
        </div>
    )
}

export default LoginForm
