import { atom } from "recoil";
import axios from "axios";
import { generateToken } from '../utils/common'
interface User {
    email: string;
    name: string;    
    token?: string;
}

export const userState = atom<User>({
    key: "user",
    default: { name: "", email: "" },
})
// 로그인 여부
export const isLoggedInState = atom<boolean>({
    key: "isLoggedIn",
    default: localStorage.getItem("userInfo") ? true : false,
});

// login
export const login = async (formData: { email: string; password: string; }) => {
    const response = await axios.get("https://shell-power-umbrella.glitch.me/users");
    const users = response.data;

    
    const user = users.find((user: { email: string; password: string; }) => user.email === formData.email && user.password === formData.password);

    if (user) {
        const token = generateToken()
        const userInfo = {
            token: token,
            user: user.name,
            email: user.email,
            profile: user.profile_picture

        }
        console.log(userInfo)
        localStorage.setItem("userInfo", JSON.stringify(userInfo));     
        return { name: user.name, token: token };
    } else {
        throw new Error('Invalid email or password');
    }
};

// sign up
export const signup = async (newMember: {
    email: string,
    password: string,
    name: string,
    birthday: string,
    profile_picture: string,
    posts: Array,
    subscriptions: Array,
    follower: Array,
    agreement: boolean
}) => {
    console.log('받아옴', newMember)
    const response = await axios.post("https://shell-power-umbrella.glitch.me/users", newMember);
    // const { username, email, token } = response.data;

    // localStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장

// return { username, email, token };
};
  
//logout
export const logout = async () => {
    try {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem("userInfo");
    } catch (error) {
    console.error("Error during logout:", error);
    }
};