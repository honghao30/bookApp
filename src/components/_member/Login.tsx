import React, { ChangeEvent, MouseEvent, FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DDayCount from '../../books/compornents/dday'
import MyBtn from '../ui_elements/MyBtn';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../../src/firebase';

const LoginForm: React.FC  = () => {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const loginMsg = () => {
        alert('현재는 외부인 로그인을 허용하지 않습니다.')
    }

    const onChange = (event: { target: { name: any; value: any; }; }) => {
        const {target: {name, value}} = event;
        if (name==='email') {            
            setEmail(value)
            console.log(email)
        } else if (name=== "password") {
            setPassword(value);
            console.log(password)
        }
    }    
    const login = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();          
        try {
            await signInWithEmailAndPassword(authService, email, password);  
            navigate('/BookMain');          
        } catch (e) {
            return e.message.replace("Firebase: Error ", "");
        }
    }

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
          console.log(user);
          if (user) {
            // 로그인 된 상태일 경우
            setIsLoggedIn(true);
            navigate('/BookMain');
          } else {
            // 로그아웃 된 상태일 경우
            setIsLoggedIn(false);
          }
        });
      }, []);

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
                <Link to="#">Admin Login</Link>
            </div>            
            <div className='admin-login__area'>
                <form onSubmit={login}>
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
        </div>
    )
}
// https://muhly.tistory.com/118
export default LoginForm
