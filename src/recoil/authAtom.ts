import { atom } from 'recoil'

const authState = atom({
  key: 'auth-state',
  default: {
    userEmail: '',
  },
})

export default authState