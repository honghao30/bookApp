import React, { ChangeEvent, MouseEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MyBtn from '../ui_elements/MyBtn';
import DDayCount from '../../books/compornents/dday'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const LoginForm: React.FC  = () => {    
    const navigate = useNavigate();

    return (
        <div className="login__form">
            <div className='sns__login'>
                <Stack spacing={1} direction="row">                    
                    <Button variant="contained" color="warning">카카오톡 로그인</Button>                    
                </Stack>                             
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
