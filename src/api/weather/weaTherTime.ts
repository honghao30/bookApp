// 날짜계산
const fullyear: number = new Date().getFullYear();
const month: string = new Date().getMonth() + 1 < 10  ? '0' + (new Date().getMonth() + 1)  : new Date().getMonth() + 1;
const date: string = new Date().getDate() < 10  ? '0' + (new Date().getDate() - 1)  : new Date().getDate();
const ydate: string = (new Date().getDate() - 1 ) < 10  ? '0' + (new Date().getDate() - 1)  : new Date().getDate() - 1;
const ydate2: string = (new Date().getDate() - 2) < 10  ? '0' + (new Date().getDate() - 2)  : new Date().getDate() - 2;
const ydate3: string = (new Date().getDate() - 3) < 10  ? '0' + (new Date().getDate() - 3)  : new Date().getDate() - 3;

const ydate7: string = (new Date().getDate() - 7) < 10 ?  '0' + (new Date().getDate() - 7) : new Date().getDate() - 7;

const ndate1: string = (new Date().getDate() + 1) < 10  ? '0' + (new Date().getDate() + 1)  : new Date().getDate() + 1;
const ndate2: string = (new Date().getDate() + 2) < 10 ? '0' + (new Date().getDate() + 2)  : new Date().getDate() + 2;
const ndate3: string = (new Date().getDate() + 3) < 10  ? '0' + (new Date().getDate() + 3)  : new Date().getDate() + 3;

const hh: string = new Date().getHours() < 10  ? '0' + new Date().getHours()  : new Date().getHours();
const mm: string = new Date().getMinutes() < 10  ? '0' + new Date().getMinutes()  : new Date().getMinutes();
const ss: string = new Date().getSeconds() < 10  ? '0' + new Date().getSeconds()  : new Date().getSeconds();

const nowData: string = `${fullyear}${month}${date}${hh}${mm}${ss}`;
const todayData: string = `${fullyear}${month}${date}`;
const dailyData: string = `${fullyear}${month}${ydate}`;
const WeeklyData: string = `${fullyear}${month}${ydate7}`;

const prevDay = (n: number): string => (new Date().getDate() - n ) < 10  ? '0' + (new Date().getDate() - n)  : new Date().getDate() - n;
const nextDay = (n: number): string => (new Date().getDate() + n ) < 10  ? '0' + (new Date().getDate() + n)  : new Date().getDate() + n;

type Day = '일요일' | '월요일' | '화요일' | '수요일' | '목요일' | '금요일' | '토요일';

function getTodayLabel(): Day {    
    const week: Day[] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];    
    const today: number = new Date().getDay();
    const todayLabel: Day = week[today];      
    return todayLabel;
}

const todayPrint: string =  `${fullyear}년 ${month}월 ${date}일 ${hh}시`;

//날짜 계산
const calcTime = (times: number): string => {
    const newData: Date = new Date(times * 1000);
    const sunHous: string = newData.getHours() < 10 ? '0' + newData.getHours(): newData.getHours(); 
    const sumMinutes: string = newData.getMinutes() < 10  ? '0' + newData.getMinutes() : newData.getMinutes();
    const sunTiems: string = `${sunHous}시 ${sumMinutes}분`;    
    //return { "hours":sunHous,"times":sunTiems };
    return sunTiems ;
}
const calcHuos = (times: number): string => {
    const newData: Date = new Date(times * 1000);
    const sunHous: string = newData.getHours() < 10 ? '0' + newData.getHours(): newData.getHours(); 
    //return { "hours":sunHous,"times":sunTiems };
    return sunHous ;
}

// 일주일 계산
const getCurrentWeek = () => {
    const day = new Date();
    const sunday = day.getTime() - 86400000 * day.getDay();
  
    day.setTime(sunday);
  
    const result = [day.toISOString().slice(0, 10)];
  
    for (let i = 1; i < 7; i++) {
      day.setTime(day.getTime() + 86400000);
      result.push(day.toISOString().slice(0, 10));
    }
  
    return result;
}
  

export { getCurrentWeek, dailyData, calcTime,calcHuos,WeeklyData,todayData,getTodayLabel,ydate7,todayPrint,hh,prevDay,nextDay};

 