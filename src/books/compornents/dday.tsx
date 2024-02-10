import React, { useEffect, useState } from 'react';
import DDayCounter from '../../utils/common';
import styled from "styled-components";

interface Event {
  date: Date;
  dDay: number;
}

const DDayCount: React.FC = () => {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [daylist, setDaylist] = useState<Record<string, string>>({
    '총회': '2024-03-11',
    '유월절': '2024-03-24',
    '무교절': '2024-04-11'
  });

  useEffect(() => {
    const dates = Object.values(daylist);
    const counter = new DDayCounter(dates);
    setNextEvent(counter.getNextEvent());
  }, [daylist]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='d-day-wrap'>
      {nextEvent && nextEvent.dDay <= 30 && (
        <>
          {Object.keys(daylist).find(key => daylist[key] === nextEvent.date.toISOString().split('T')[0])} 까지 D-{nextEvent.dDay} 남았습니다.
        </>
      )}
    </div>
  );
};

export default DDayCount;
