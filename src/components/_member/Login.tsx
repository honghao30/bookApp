import React, { FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DDayCount from '../../books/compornents/dday'
import MyBtn from '../ui_elements/MyBtn';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useRecoilState } from 'recoil';
import { login, isLoggedInState, signOut } from '../../recoil/authAtom';

import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { authService } from '../../../src/firebase';

const LoginForm: React.FC  = () => {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = useState(false)

    const navigate = useNavigate();

    const loginMsg = () => {
        alert('현재는 외부인 로그인을 허용하지 않습니다.')
    }

    const adminLogin = () => {
        setOpen(prevOpen => !prevOpen);
    }

    const onChange = (event: { target: { name: any; value: any; }; }) => {
        const {target: {name, value}} = event;
        if (name==='email') {            
            setEmail(value)            
        } else if (name=== "password") {
            setPassword(value);            
        }
    } 

    const Handlelogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();     
        const formData = {
           email: email,
           password: password,
        };    
        try {          
            const loggedInUser = await login(formData);
            // setUser(loggedInUser);
            // setIsLoggedIn(true);                    
            // navigate("/Main")  
            } catch (error) {
            console.error(error); // 이 부분은 에러처리를 원하는 방식으로 변경하실 수 있습니다.
        }                 
        // try {
        //   await signInWithEmailAndPassword(authService, formData.email, formData.password);
        //   setLoggedInState(true); 
        //   navigate('/BookMain');
        // } catch (e) {
        //   setError(e.message.replace("Firebase: Error ", ""));
        // }
    }

    // useEffect(() => {
    //     authService.onAuthStateChanged((user) => {
    //         console.log(user);
    //         if (user) {
    //             navigate('/BookMain');
    //         }
    //     });
    //   }, []);

    return (
        <div className="login__form">
            <div className='sns__login'>
                <Stack spacing={1} direction="row">      
                    <Button variant="contained" onClick={ loginMsg }>구글 로그인</Button>              
                    <Button variant="contained" color="warning"  onClick={ loginMsg }>카카오톡 로그인</Button>                    
                </Stack>                             
            </div>
            <DDayCount />
            <div className='sign-guide__wrap'>   
                <MyBtn
                    type="button"                      
                    iconOnly={false}
                    btnColor={'btn-default-text'}
                    btnSize={'small'}
                    onClick={ adminLogin }
                >Admin Login</MyBtn>                
            </div>            
            {open &&
            <div className='admin-login__area'>
                <form onSubmit={Handlelogin}>
                    <div className='login__inner'>
                        <p><input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} /></p>
                        <p><input name="password" type="password" placeholder="password" required value={password} onChange={onChange} /></p>
                    </div>
                    {error && <p>{error}</p>} 
                    <MyBtn
                      type="submit"                      
                      iconOnly={false}
                      btnColor={'btn-primary'}
                      btnSize={'medium full-width'}
                    >로그인</MyBtn>                    
                </form>            
            </div>
            }
        </div>
    )
}
// https://muhly.tistory.com/118
export default LoginForm
