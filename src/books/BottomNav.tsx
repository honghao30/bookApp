import React, { useState, useCallback, useEffect } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { Drawer } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const BottomNav: React.FC = () => {
  const [value, setValue] = React.useState('recents');
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState(false);
  const openDrawer = useCallback(() => setDrawer(true), []);
  const closeDrawer = useCallback(() => setDrawer(false), []);
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const alertMsg = () => {
    alert('열심히 준비중입니다.');
  }
  const alertMsg2 = () => {
    alert('열심히 준비중입니다.');
  }
  const goHome = () => {
    navigate('/bookMain')
  }

  return (
    <>
      <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0  }} 
        value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="홈"
          value="홈"
          icon={<HomeIcon />}
          onClick={goHome}
        />
        <BottomNavigationAction
          label="검색"
          value="검색"
          icon={<TravelExploreIcon />}
          onClick={ alertMsg }
        />
        {/* <BottomNavigationAction
          label="오디오"
          value="오디오"
          icon={<HeadsetIcon />}
        /> */}
      <BottomNavigationAction
          label="절기"
          value="절기"
          icon={<CalendarMonthIcon />}
          onClick={alertMsg2}
        />      
      <BottomNavigationAction
          label="설정"
          value="설정"
          icon={<SettingsIcon />}
          onClick={openDrawer}
        />    
            
      </BottomNavigation>  
      <Drawer
          anchor={"bottom"}
          open={drawer}
          onClose={closeDrawer}
          PaperProps={{
            style: {
              overflow: "hidden"
            }
          }}
        >
          <div className="setting-list">
            <List
              sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
              subheader={<ListSubheader>설정</ListSubheader>}
            >
              <ListItem>
                <ListItemIcon>
                  <AccessTimeFilledIcon />
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" primary="다크모드" />
                <Switch
                  edge="end"
                  onChange={handleToggle('darkMod')}
                  checked={checked.indexOf('darkMod') !== -1}
                  inputProps={{
                    'aria-labelledby': 'switch-list-label-wifi',
                  }}
                />
              </ListItem>
              <ListItem>
               <Box sx={{ width: '100%' }}>
                  <Typography id="input-slider" gutterBottom>
                    폰트 사이즈
                  </Typography>  
                  <Grid item xs>
                    <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                  </Grid>  
                </Box>           
              </ListItem>
            </List>            
          </div>          
        </Drawer>  
    </>  
    )
}

export default BottomNav