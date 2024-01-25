import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HeadsetIcon from '@mui/icons-material/Headset';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';

const BottomNav: React.FC = () => {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0  }} 
      value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="홈"
        value="홈"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="검색"
        value="검색"
        icon={<TravelExploreIcon />}
      />
      <BottomNavigationAction
        label="오디오"
        value="오디오"
        icon={<HeadsetIcon />}
      />
     <BottomNavigationAction
        label="절기"
        value="절기"
        icon={<CalendarMonthIcon />}
      />      
     <BottomNavigationAction
        label="설정"
        value="설정"
        icon={<SettingsIcon />}
      />                  
    </BottomNavigation>    
    )
}

export default BottomNav