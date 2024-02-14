import { atom, useRecoilState, useRecoilCallback } from "recoil";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../src/firebase';
interface User {
    email: string;
    // name: string;    
    token?: string;
}

export const userState = atom<User>({
    key: "user",
    default: { email: "" },
})
  
//Logout 하는 함수
export async function logout() {
   await signOut(authService);
   return;
}