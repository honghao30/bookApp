// 유니크 ID 만들기
export const uniqueId = (): string => {
   return Math.random().toString(16).slice(-4);
}
// 임시 토큰 생성
export const generateToken = ():string => {
    return Math.random().toString(36).substr(2);
}

export const isLogin = () => !!localStorage.getItem('userInfo');

// 날짜 시간 셋팅
export const getTodayDate = (format: string) => {
   const weekdays: string[] = ['일', '월', '화', '수', '목', '금', '토'];
   const today: Date = new Date();
   const year: number = today.getFullYear();
   let month: number | string = today.getMonth() + 1;
   let day: number | string = today.getDate();
   const hours: number = today.getHours();
   let minutes: number | string = today.getMinutes();
   const dayOfWeek: string = weekdays[today.getDay()];
   month = month < 10 ? '0' + month : month;
   day = day < 10 ? '0' + day : day;
   const timeOfDay: string = hours < 12 ? '오전' : '오후';
   const hours12: number = hours % 12 || 12;
   minutes = minutes < 10 ? '0' + minutes : minutes;
 
   const TodayDateFull: string = `${year}년 ${month}월 ${day}일 ${hours12}시 ${minutes} 분 ${timeOfDay} (${dayOfWeek})`;
   const TodayDateFullDash: string = `${year}-${month}-${day} ${hours12}:${minutes} ${timeOfDay}`;
   const TodayDateMitres: string = `${year}-${month}-${day} ${hours12}:${minutes}`;
   const TodayData: string = `${month}월 ${day}일 ${dayOfWeek}요일`;
   const currentTime: string = `${timeOfDay} ${hours12}:${minutes}`;
 
   switch(format) {
       case 'yy-mm-dd':
           return TodayDateFullDash.slice(2);
       case 'mm-dd':
           return TodayDateFullDash.slice(5, 10);
       case 'hh:mm':
           return currentTime.slice(3);
       case 'yy-mm-dd hh:mm:ss':
           return TodayDateMitres;
       default:
           return TodayDateFullDash;
   }
}
