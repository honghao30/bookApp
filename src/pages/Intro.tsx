import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from "../components/_member/Login";


//fb
import { useSetRecoilState } from 'recoil';
import { authState, isLoggedInState } from '../recoil/authAtom';
import { authService } from '../firebase';

const Intro: React.FC = () => {    
    const setAuth = useSetRecoilState(authState);
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged((authUser) => {
            if (authUser) {
                setAuth(authUser);
                setIsLoggedIn(true);
                navigate('/BookMain');
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);    
    return (
        <div className="login__page">
            <div className="logo-center">
                <h1>진리 도서관</h1>
            </div>
            <LoginForm />
        </div>
    );
};

export default Intro;