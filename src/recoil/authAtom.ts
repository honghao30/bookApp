import { atom } from 'recoil';

export const loginFormState = atom({
  key: 'loginFormState',
  default: {
    email: '',
    password: '',
  },
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false, // 기본값은 로그인되지 않은 상태
});

export const setLoggedInState = (isLoggedIn: boolean) => {
  isLoggedInState.set(isLoggedIn);
};