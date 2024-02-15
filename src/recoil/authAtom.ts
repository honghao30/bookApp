import { atom } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { authService } from '../../src/firebase';
interface User {
  email: string;
  // name: string;    
  token?: string;
}

export const userState = atom<User>({
  key: "user",
  default: { email: "", token: "" },
})

// 로그인 여부
export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: localStorage.getItem("user") ? true : false,
});

// login
export const login = async (formData: { email: string; password: string; }) => {  
  try {
    await signInWithEmailAndPassword(authService, formData.email, formData.password);        
    console.log('전송완료')
    authService.onAuthStateChanged((user: any) => {        
        if (user) {
          console.log('성공', user);
        }
    });    
  } catch (error) {
    console.log('Error')
  }    

  // if (user) {      
  //     const user = {
  //         token: accessToken,          
  //         email: user.email
  //     }
  //     console.log(user)
  //     localStorage.setItem("userInfo", JSON.stringify(user));     
  //     return { email: user.email, token: token };
  // } else {
  //     throw new Error('Invalid email or password');
  // }
};

export async function logout() {
  await signOut(authService);
  localStorage.removeItem("user");
  return;
}