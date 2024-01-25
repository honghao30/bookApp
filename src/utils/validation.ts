// 유효성 검사
export const isEmail = (value:string): boolean => {
   const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
 
   if (regEmail.test(value)) {
     return true
   } 
   return false
}
export const usernameValidator = (value: string): boolean => {
   if (!lengthScopeValidator(value, 4, 12)) {
       return false;
   }

   return !isSpecialChar(value);
}

export const passwordValidator = (password: string): boolean => {
   if (!lengthScopeValidator(password, 6, 20)) {
       return false;
   }

   if (isSpecialChar(password)) {
       return false;
   }

   // 숫자,영어 최소 1개 있는지 체크하는 정규식
   return /(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)/.test(password);
};

export const isUserName = (value: string): boolean => {
   // 이름 유효성 검증
   // 국문, 영문 대소문자, 공란 입력 가능
   const regName = /^[가-힣|a-z|A-Z| |*]+$/
   if (regName.test(value)) {
     return true
   } else {
     return false
   }
 }
// 한글 체크
export function isKor(value: string) {
   const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
   if (checkKor.test(value)) {
     return true
   }  
   return false 
 }

 //길치 체크
 const lengthScopeValidator = (
   value: string,
   minLength: number,
   maxLength: number,
): boolean => {
   const Length = value.length;
   return Length >= minLength && Length <= maxLength;
};
//특수문자
const isSpecialChar = (value: string) => {
   const specialChar = /[^0-9a-zA-Z]/g;
   return specialChar.test(value);
};